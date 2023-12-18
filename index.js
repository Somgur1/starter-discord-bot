const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
  ],
});
var mysql = require('mysql');

require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 

const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const app = express();

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${TOKEN}`
  }
});





const fs = require('node:fs');
const path = require('node:path');
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const role_remove_react = require('./functions/remove_role_on_react');
const role_add_react = require('./functions/add_role_on_react');
// const DB = require("@replit/database");
// const db = new DB();
// const { Redis } = require('ioredis');
// const redis = new Redis;
// import { createClient } from 'redis';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Dungeons and Dragons');
});

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    console.log(`got path at ${filePath}`)
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user == client.user) {
    return;
  }
  role_add_react.add_role_react(reaction, user, client);
})

client.on('messageReactionRemove', (reaction, user) => {
  if (user == client.user) {
    return;
  }
  role_remove_react.remove_role_react(reaction, user, client);
})

client.on('messageCreate', async function(msg) {
  if(msg.author == client.user)return;
  const prefix = "!"
  var words = msg.content.split(' ');
  if (!msg.content.startsWith(prefix))return;
  
  const serverName = msg.guild.name;
  const ServerId = msg.guild.id;

  if (msg.content.startsWith(prefix + 'ping')) {
    console.log("TEST")
    msg.reply("Pong")
  }
  if (msg.content.startsWith(prefix + 'testing')) {
    server_id = msg.guild.id;

    console.log(server_id)
    con.connect(function(err) {
      if (err) throw err;
      con.query(`SELECT * FROM react_roles WHERE server = '${server_id}'`, function (err, result) {
        if (err) throw err;
      });
    });
 
  }
});
// const LoginToken = "MTEzNTE3NjY2NTg1Nzc4OTk2Mg.Gu4jFb.p_jMID9ceYZFXLsZXbgYJ28hll8qRFaCrWaCZU";
// const LoginToken2 = "MTAzMjk4NjA2OTY0MzI5Njc5OA.GQNIz-.aVxx04v7DFIMKNsvPXCCvKLUfqSUoWdGKrrZyw";
// client.login(TOKEN);


