import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('embed')
  .setDescription('Crée un embed personnalisé')
  .addStringOption(option =>
    option.setName('titre')
      .setDescription('Titre de l\'embed')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('description')
      .setDescription('Description de l\'embed')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('couleur')
      .setDescription('Couleur hexadécimale (ex: #ff0000)')
      .setRequired(false)
  );

export async function execute(interaction) {
  const titre = interaction.options.getString('titre');
  const description = interaction.options.getString('description');
  let couleur = interaction.options.getString('couleur') || '#0099ff';

  // Vérifie le format de la couleur
  if (!/^#?[0-9a-fA-F]{6}$/.test(couleur)) couleur = '#0099ff';
  if (!couleur.startsWith('#')) couleur = `#${couleur}`;

  const embed = new EmbedBuilder()
    .setTitle(titre)
    .setDescription(description)
    .setColor(couleur);

  await interaction.reply({ embeds: [embed] });
}