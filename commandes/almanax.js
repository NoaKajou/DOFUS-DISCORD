import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import schedule from 'node-schedule';

async function getAlmanaxEmbed() {
  const now = new Date();
  const date_en = now.toISOString().split('T')[0];
  const date_fr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const lang = process.env.ALMANAX_LANG || "fr";
  const url = `https://alm.dofusdu.de/dofus/${lang}/${date_en}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Réponse non OK");
    const data = await response.json();
    const bonus = data.data.bonus.bonus;
    const description = data.data.bonus.description;
    const item = data.data.item_name;
    const quantity = data.data.item_quantity;

    return new EmbedBuilder()
      .setColor(0xf39c12)
      .setTitle('📜 Almanax')
      .setDescription(`**${date_fr.charAt(0).toUpperCase() + date_fr.slice(1)}**`)
      .addFields(
        { name: '🌟 Bonus du jour', value: `**${bonus}**\n${description}` },
        { name: '🎁 Offrande', value: `**${quantity}** × *${item}*` }
      )
      .setFooter({ text: '📡 Source : alm.dofusdu.de' })
      .setTimestamp();
  } catch (err) {
    console.error('❌ Erreur getAlmanaxEmbed :', err);
    return null;
  }
}

export function auto(client) {
  const channelId = process.env.ALMANAX_CHANNEL;
  // Envoie toutes les 24h à 01:59 (cron format)
  schedule.scheduleJob('0 1 * * *', async () => {
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