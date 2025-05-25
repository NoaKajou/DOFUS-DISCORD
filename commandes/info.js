import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('info')
  .setDescription('ℹ️ Infos sur le bot, ses créateurs et son fonctionnement');

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle('🤖 À propos du bot Dofus')
    .setDescription(`Voici les personnes ayant contribué à la création du bot et des infos utiles :`)
    .setThumbnail('https://upload.wikimedia.org/wikipedia/fr/thumb/3/30/DofusLogo.png/800px-DofusLogo.png')
    .addFields(
      {
        name: '👨‍💻 Développeur principal',
        value: '• **Noa** *(Kaneki1394)* - Création du système XP, des commandes, intégration des API.'
      },
      {
        name: '🎨 Concepteur visuel',
        value: '• **[null]** - Aide sur les embeds, la présentation et les icônes.'
      },
      {
        name: '📚 Données & API',
        value: '• Utilisation de [alm.dofusdu.de](https://alm.dofusdu.de) pour les données de jeu (almanax).'
      },
      {
        name: '🛠️ Fonctionnement',
        value: `• Utilise \`/xp\` pour voir ton niveau.\n• Gagne de l'XP en écrivant dans les salons.\n• Commandes utiles : \`/almanax\`, \`/monture\`, etc.`
      },
      {
        name: '📦 Code source',
        value: '[Voir le projet sur GitHub](https://github.com/NoaKajou/DOFUS-DISCORD)'
      }
    )
    .setFooter({ text: 'Merci d’utiliser le bot Dofus (non officiel) ❤️' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('🌐 Dépôt GitHub')
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/NoaKajou/DOFUS-DISCORD')
  );

  await interaction.reply({ embeds: [embed], components: [row] });
}
