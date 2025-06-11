require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 📌 יצירת הפקודה /dash
const commands = [
  new SlashCommandBuilder()
    .setName('dash')
    .setDescription('מוסר דש למישהו')
    .addUserOption(option =>
      option.setName('user')
            .setDescription('למי למסור דש?')
            .setRequired(true)
    )
].map(command => command.toJSON());

// 📌 רישום הפקודה
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID),
  { body: commands }
).then(() => console.log('📡 Completed !')).catch(console.error);

// 📌 תגובה לפקודת Slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'dash') {
    const sender = interaction.user;
    const recipient = interaction.options.getUser('user');
    await interaction.reply(`!<@${sender.id}> מוסר דש ל־<@${recipient.id}>`);
  }
});

client.once('ready', () => {
  console.log(`🤖 Connected as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);


const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(3000, () => {
  console.log('🌐 Web server is running');
});