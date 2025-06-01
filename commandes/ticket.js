import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('🎟️ Crée un ticket privé pour contacter le staff')
  .addStringOption(option =>
    option.setName('raison')
      .setDescription('✏️ Explique la raison du ticket')
      .setRequired(true)
  );

export async function execute(interaction) {
  const raison = interaction.options.getString('raison');
  const guild = interaction.guild;
  const user = interaction.user;

  // 📬 Crée un salon privé pour le ticket
  const channel = await guild.channels.create({
    name: `ticket-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
      // Ajoute ici l'ID du rôle staff si besoin :
      // { id: 'ID_ROLE_STAFF', allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
    ],
    topic: `Ticket ouvert par ${user.tag} | Raison : ${raison}`,
  });

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('🎫 Ticket Ouvert')
    .setDescription(`👤 Ticket ouvert par <@${user.id}>`)
    .addFields({ name: '📝 Raison', value: raison })
    .setFooter({ text: '🎟️ Support du staff' })
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('🔒 Clôturer')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('delete_ticket')
        .setLabel('🗑️ Supprimer')
        .setStyle(ButtonStyle.Danger)
    );

  await channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ Ton ticket a été créé : ${channel}`, flags: 64 });
}

// Gestion des boutons (à placer dans ton index.js ou un handler d'interactions)
export async function handleButton(interaction) {
  if (!interaction.isButton()) return;

  const channel = interaction.channel;

  if (interaction.customId === 'close_ticket') {
    // Retire l'accès au créateur du ticket
    const perms = channel.permissionOverwrites.cache.find(po => po.type === 1 && po.id !== interaction.guild.roles.everyone.id);
    if (perms) {
      await channel.permissionOverwrites.edit(perms.id, { ViewChannel: false });
    }
    await interaction.reply({ content: '🔒 Ticket clôturé. Seul le staff peut encore voir ce salon.', flags: 64 });
  }

  if (interaction.customId === 'delete_ticket') {
    // Affiche une confirmation avant suppression
    const confirmRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm_delete_ticket')
          .setLabel('✅ Confirmer')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel_delete_ticket')
          .setLabel('❌ Annuler')
          .setStyle(ButtonStyle.Secondary)
      );
    await interaction.reply({
      content: '⚠️ Es-tu sûr de vouloir supprimer ce ticket ?',
      components: [confirmRow],
      flags: 64
    });
  }

  if (interaction.customId === 'confirm_delete_ticket') {
    await interaction.update({ content: '🗑️ Ticket supprimé dans 3 secondes...', components: [] });
    setTimeout(async () => {
      try {
        await channel.delete();
      } catch (e) {}
    }, 3000);
  }

  if (interaction.customId === 'cancel_delete_ticket') {
    await interaction.update({ content: '❌ Suppression annulée.', components: [] });
  }
}