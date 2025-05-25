import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import play from 'play-dl';

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Joue une musique depuis YouTube')
  .addStringOption(option =>
    option.setName('url')
      .setDescription('URL YouTube de la musique')
      .setRequired(true)
  );

export async function execute(interaction) {
  const url = interaction.options.getString('url');
  console.log('URL reçue pour /play :', url);

  const isValid = await play.validate(url);
  console.log('Résultat play.validate(url) :', isValid);

  if (!url || !isValid) {
    return interaction.reply({ content: 'URL YouTube invalide.', flags: 64 });
  }

  const channel = interaction.member.voice.channel;
  if (!channel) {
    return interaction.reply({ content: 'Tu dois être dans un salon vocal !', flags: 64 });
  }

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  try {
    // On ne passe plus par video_info ni par l'URL du format audio
    const stream = await play.stream(url);
    console.log('Contenu du stream play-dl :', stream);

    if (!stream || !stream.stream || !stream.type) {
      await interaction.reply({ content: 'Impossible de lire ce lien (stream non valide).', flags: 64 });
      connection.destroy();
      return;
    }

    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });

    await interaction.reply(`▶️ Lecture de la musique : ${url}`);
  } catch (error) {
    console.error('Erreur lors de play.stream :', error);
    await interaction.reply({ content: '❌ Erreur lors de la récupération du flux audio.', flags: 64 });
    connection.destroy();
  }
}