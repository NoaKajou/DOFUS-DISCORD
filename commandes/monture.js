import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('monture')
  .setDescription('🐎 Tutoriel pour apprivoiser une monture (Dragodinde) dans Dofus');

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0xf1c40f)
    .setTitle('🐴 Apprivoiser une Monture dans Dofus')
    .setDescription('Voici un guide étape par étape pour apprivoiser une dragodinde sauvage.')
    .addFields(
      {
        name: '🔓 1. Obtenir le sort "Apprivoisement de monture',
        value: `Tu peux l'obtenir à la fin du donjon du Koulosse (niveau 100) pour 50 fleurs de Kaliptus. \n Le sort donne un taux de capture de 10% piur chaque dragodinde en combat (taux non cumulable avec la prospection ou autre).`,
      },
      {
        name: '📘 2. Le filet de capture"',
        value: `Une fois le sort aquis, il vous faut un filet fabricable a partir du niveau 60 avec le métier de bricoleur \n Une fois le filet fabriqué, n'oublie pas de l'équiper dans ton slot d'objet de combat.`,
      },
      {
        name: '🎯 3. Trouver une dragodinde sauvage',
        value: `Elles apparaissent aléatoirement dans les Plaines de Cania, souvent en groupe. \n Seules les dragodindes amande, rousses et dorées peuvent être capturées.`,
      },
      {
        name: '⚔️ 4. Lancer un combat et utiliser le sort',
        value: `En combat contre une dragodinde, utilise le sort "Apprivoisement de monture".`,
      },
      {
        name: '🎉 5. Félicitations !',
        value: `Si le sort réussit, la dragodinde est capturée et t’appartient !`,
      },
    )
    .setThumbnail('https://static.ankama.com/dofus/www/game/items/200/8206.png') // Icône de dragodinde
    .setFooter({ text: 'Guide apprivoisement de monture' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
