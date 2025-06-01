import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';

const cooldown = new Map(); 
const XP_COOLDOWN = 60 * 1000;

const xpFile = path.join('./data', 'xp.json');
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(xpFile)) fs.writeFileSync(xpFile, '{}');

let userData = JSON.parse(fs.readFileSync(xpFile));

// Commande /xp
export const xp = {
  data: new SlashCommandBuilder()
    .setName('xp')
    .setDescription('🎖️ Affiche ton niveau et ton prestige'),
  async execute(interaction) {
    const userId = interaction.user.id;
    if (!userData[userId]) userData[userId] = { xp: 0, level: 1, prestige: 0 };

    const { xp, level, prestige } = userData[userId];
    const nextLevelXp = level * 100;
    const progress = Math.floor((xp / nextLevelXp) * 20);
    const bar = '█'.repeat(progress) + '░'.repeat(20 - progress);

    const totalPrestige = 5;
    const goldStars = '⭐'.repeat(prestige);
    const greyStars = '☆'.repeat(totalPrestige - prestige);

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle(`📊 Carte de ${interaction.user.username}`)
      .addFields(
        { name: 'Niveau', value: `**${level}**`, inline: true },
        { name: 'XP', value: `**${xp} / ${nextLevelXp}**`, inline: true },
        { name: 'Progression', value: `\`${bar}\`` },
        { name: 'Prestige', value: `${goldStars}${greyStars}`, inline: false }
      )
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: 'Système de progression' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

// Commande /prestige
export const prestige = {
  data: new SlashCommandBuilder()
    .setName('prestige')
    .setDescription('🏅 Permet de faire un prestige quand tu es niveau 100'),
  async execute(interaction) {
    const userId = interaction.user.id;
    if (!userData[userId]) userData[userId] = { xp: 0, level: 1, prestige: 0 };
    const user = userData[userId];

    if (user.level < 100) {
      await interaction.reply({
        content: '❌ Tu dois être au niveau 100 pour faire un prestige !',
        flags: 1 << 6
      });
      return;
    }

    if (user.prestige >= 5) {
      await interaction.reply({ content: '🏅 Tu as déjà atteint le prestige maximum !', flags: 1 << 6 });
      return;
    }

    user.level = 1;
    user.xp = 0;
    user.prestige++;
    fs.writeFileSync(xpFile, JSON.stringify(userData, null, 2));

    console.log(`👑 ${interaction.user.username} est passé prestige ${user.prestige}`);

    const totalPrestige = 5;
    const goldStars = '⭐'.repeat(user.prestige);
    const greyStars = '☆'.repeat(totalPrestige - user.prestige);

    const embed = new EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle('🏅 Prestige atteint !')
      .setDescription(`Bravo ${interaction.user.username}, tu es maintenant prestige **${user.prestige}** !`)
      .addFields(
        { name: 'Réinitialisation', value: 'Tu repars au niveau 1 avec 0 XP.' },
        { name: 'Prestige', value: `${goldStars}${greyStars}`, inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

// Ajout automatique XP
export function auto(client) {
  client.on('messageCreate', message => {
    if (message.author.bot || message.channel.type !== 0) return;

    const userId = message.author.id;
    const now = Date.now();

    if (cooldown.has(userId)) {
      const lastXP = cooldown.get(userId);
      if (now - lastXP < XP_COOLDOWN) return;
    }
    cooldown.set(userId, now);

    if (!userData[userId]) userData[userId] = { xp: 0, level: 1, prestige: 0 };

    const user = userData[userId];
    const gainedXp = Math.floor(Math.random() * 6) + 5;
    user.xp += gainedXp;

    const nextLevelXp = user.level * 100;
    if (user.xp >= nextLevelXp) {
      user.xp -= nextLevelXp;
      user.level++;
      console.log(`🌟 ${message.author.username} est passé niveau ${user.level}`);
    }

    console.log(`📈 ${message.author.username} a gagné ${gainedXp} XP (Total: ${user.xp}/${nextLevelXp})`);

    fs.writeFileSync(xpFile, JSON.stringify(userData, null, 2));
  });
}
