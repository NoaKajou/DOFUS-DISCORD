import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import schedule from 'node-schedule';

export const data = new SlashCommandBuilder()
  .setName('almanax')
  .setDescription("📜 Affiche l'Almanax du jour");

export async function execute(interaction) {
  const embed = await getAlmanaxEmbed();
  if (embed) {
    await interaction.reply({ embeds: [embed] });
  } else {
    await interaction.reply({ content: '❌ Impossible de récupérer l\'Almanax.', ephemeral: true });
  }
}

export async function getAlmanaxEmbed() {
  const now = new Date();
  const date_en = now.toISOString().split('T')[0];
  const date_fr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const lang = process.env.ALMANAX_LANG || "fr";

  const url = `https://alm.dofusdu.de/dofus/${lang}/${date_en}`;
  console.log("📡 URL appelée :", url);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Réponse non OK");

    const data = await response.json();
    const bonus = data.data.bonus.bonus;
    const description = data.data.bonus.description;
    const item = data.data.item_name;
    const quantity = data.data.item_quantity;

    const embed = new EmbedBuilder()
      .setColor(0xf39c12)
      .setTitle('📜 Almanax')
      .setDescription(`**${date_fr.charAt(0).toUpperCase() + date_fr.slice(1)}**`)
      .addFields(
        {
          name: '🌟 Bonus du jour',
          value: `**${bonus}**\n${description}`,
          inline: false
        },
        {
          name: '🎁 Offrande',
          value: `**${quantity}** × *${item}*`,
          inline: false
        }
      )
      .setFooter({ text: '📡 Source : alm.dofusdu.de' })
      .setTimestamp();

    return embed;
  } catch (err) {
    console.error('❌ Erreur getAlmanaxEmbed :', err);
    return null;
  }
}

export function auto(client) {
  const channelId = process.env.ALMANAX_CHANNEL;

  schedule.scheduleJob('59 1 * * *', async () => {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel) return console.error('❌ Salon introuvable');

      const embed = await getAlmanaxEmbed();
      if (embed) {
        await channel.send({ embeds: [embed] });
        console.log('✅ Almanax automatique envoyé');
      }
    } catch (error) {
      console.error('❌ Erreur envoi auto Almanax :', error);
    }
  });
}
