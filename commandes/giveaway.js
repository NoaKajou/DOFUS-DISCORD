import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

// Parse une durée type "7d 3h 10m 20s" en secondes
function parseDuration(str) {
  let total = 0;
  const regex = /(\d+)\s*d|(\d+)\s*h|(\d+)\s*m|(\d+)\s*s/gi;
  let match;
  while ((match = regex.exec(str))) {
    if (match[1]) total += parseInt(match[1]) * 86400;
    if (match[2]) total += parseInt(match[2]) * 3600;
    if (match[3]) total += parseInt(match[3]) * 60;
    if (match[4]) total += parseInt(match[4]);
  }
  return total;
}

function formatDuration(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  let str = '';
  if (d) str += `${d}j `;
  if (h) str += `${h}h `;
  if (m) str += `${m}m `;
  if (s || (!d && !h && !m)) str += `${s}s`;
  return str.trim();
}

// Pour stocker les giveaways actifs (messageId -> timeoutId)
const activeGiveaways = new Map();

// GIVEAWAY
export const giveaway = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Lance un giveaway simple')
    .addStringOption(option =>
      option.setName('lot')
        .setDescription('Le lot à gagner')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('duree')
        .setDescription('Durée du giveaway (ex: 7d 3h 10m 20s)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const lot = interaction.options.getString('lot');
    const dureeStr = interaction.options.getString('duree');
    const duree = parseDuration(dureeStr);

    if (!duree || duree < 1) {
      await interaction.reply({ content: "⏳ Format de durée invalide. Exemple : `7d 3h 10m 20s`", flags: 64 });
      return;
    }

    const temps = formatDuration(duree);

    const embed = new EmbedBuilder()
      .setColor('#f1c40f')
      .setTitle('🎉 GIVEAWAY 🎉')
      .setDescription(`Lot : **${lot}**\nRéagis avec 🎉 pour participer !\n⏳ Fin dans **${temps}**`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    const message = await interaction.fetchReply();

    await message.react('🎉');

    // Stocke le timeout pour pouvoir l'annuler avec /endgiveaway
    const timeoutId = setTimeout(() => endGiveaway(interaction.channel, message.id, lot), duree * 1000);
    activeGiveaways.set(message.id, timeoutId);

    await interaction.followUp({ content: `ID du message pour ce giveaway : \`${message.id}\``, flags: 64 });
  }
};

// REROLL
export const reroll = {
  data: new SlashCommandBuilder()
    .setName('reroll')
    .setDescription('🎲 Reroll un giveaway (nouveau gagnant)')
    .addStringOption(option =>
      option.setName('messageid')
        .setDescription('ID du message du giveaway')
        .setRequired(true)
    ),
  async execute(interaction) {
    const messageId = interaction.options.getString('messageid');
    try {
      const msg = await interaction.channel.messages.fetch(messageId);
      const users = await msg.reactions.cache.get('🎉')?.users.fetch();
      let participants = users?.filter(u => !u.bot).map(u => u);

      if (!participants || participants.length === 0) {
        await interaction.reply({ content: 'Aucun participant à reroll.', flags: 64 });
        return;
      }

      // Exclure le dernier gagnant si possible (mentionné dans le dernier message du bot)
      const lastWinnerMsg = (await interaction.channel.messages.fetch({ limit: 10 }))
        .find(m => m.content?.includes('Félicitations') && m.content?.includes(messageId));
      if (lastWinnerMsg) {
        const match = lastWinnerMsg.content.match(/<@(\d+)>/);
        if (match) {
          participants = participants.filter(u => u.id !== match[1]);
        }
      }

      if (participants.length === 0) {
        await interaction.reply({ content: 'Aucun autre participant à reroll.', flags: 64 });
        return;
      }

      const winner = participants[Math.floor(Math.random() * participants.length)];
      await interaction.reply({ content: `🎲 Nouveau gagnant : <@${winner.id}> !`, allowedMentions: { users: [winner.id] } });
    } catch (e) {
      await interaction.reply({ content: "❌ Impossible de trouver le message ou la réaction.", flags: 64 });
    }
  }
};

// ENDGIVEAWAY
export const endgiveaway = {
  data: new SlashCommandBuilder()
    .setName('endgiveaway')
    .setDescription('⏹️ Termine un giveaway immédiatement')
    .addStringOption(option =>
      option.setName('messageid')
        .setDescription('ID du message du giveaway')
        .setRequired(true)
    ),
  async execute(interaction) {
    const messageId = interaction.options.getString('messageid');
    const timeoutId = activeGiveaways.get(messageId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      activeGiveaways.delete(messageId);
    }
    try {
      const msg = await interaction.channel.messages.fetch(messageId);
      // On suppose que le lot est dans l'embed
      const lot = msg.embeds[0]?.description?.match(/\*\*(.*?)\*\*/)?.[1] || 'lot';
      await endGiveaway(interaction.channel, messageId, lot, interaction);
    } catch (e) {
      await interaction.reply({ content: "❌ Impossible de trouver le message du giveaway.", flags: 64 });
    }
  }
};

// Fonction utilitaire pour finir un giveaway (utilisée par le timeout et la commande)
async function endGiveaway(channel, messageId, lot, interaction = null) {
  try {
    const msg = await channel.messages.fetch(messageId);
    const users = await msg.reactions.cache.get('🎉')?.users.fetch();
    const participants = users?.filter(u => !u.bot).map(u => u);

    if (!participants || participants.length === 0) {
      if (interaction) await interaction.followUp({ content: 'Aucun participant, giveaway annulé.' });
      else await channel.send({ content: 'Aucun participant, giveaway annulé.' });
      return;
    }

    const winner = participants[Math.floor(Math.random() * participants.length)];
    if (interaction) {
      await interaction.followUp({ content: `⏹️ Giveaway terminé ! 🎊 Félicitations <@${winner.id}> ! Tu gagnes **${lot}** ! (ID: ${messageId})` });
    } else {
      await channel.send({ content: `⏹️ Giveaway terminé ! 🎊 Félicitations <@${winner.id}> ! Tu gagnes **${lot}** ! (ID: ${messageId})` });
    }
  } catch (e) {
    if (interaction) await interaction.followUp({ content: "❌ Impossible de terminer le giveaway.", flags: 64 });
    else await channel.send({ content: "❌ Impossible de terminer le giveaway." });
  }
}