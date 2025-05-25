import 'dotenv/config';
import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'url';

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, 'commandes');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const commandModule = await import(pathToFileURL(filePath));

  const commandList = Array.isArray(commandModule.data) ? commandModule.data : [commandModule.data];

  for (const cmd of commandList) {
    client.commands.set(cmd.name, {
      ...commandModule,
      data: cmd
    });
    commands.push(cmd.toJSON());
  }

  if (typeof commandModule.auto === 'function') {
    commandModule.auto(client);
  }
}

// Enregistrement des commandes slash
const rest = new REST({ version: '10' }).setToken(TOKEN);
try {
  console.log('🚀 Enregistrement des commandes slash...');
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
  console.log('✅ Commandes enregistrées');
} catch (error) {
  console.error('❌ Erreur lors de l\'enregistrement des commandes :', error);
}

// Gestion des interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Erreur dans la commande /${interaction.commandName} :`, error);
    await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
  }
});

client.once('ready', () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.login(TOKEN);
