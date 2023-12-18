const { REST, Routes } = require('discord.js');
clientId = "1135176665857789962";
const token = "MTEzNTE3NjY2NTg1Nzc4OTk2Mg.G8hZZB.TUp-fCI6lq80F0AjJYhbVIy297lo3G_idjVXlY";
const guildId = "445180187358003220";
const single_command = require('./commands/roll.js')

// const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(token);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands. (${commandFiles})`);
		// for creating global commands
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		//for creating commands server based (I have not really tested what happens with the other commands with this. I do know that server specific commands wil get overwritten.)
		//   const data = await rest.put(
		// 	Routes.applicationGuildCommands(clientId, guildId),
		// 	{ body: commands },
		// );
		//Make sure to only use global commands OR guild commands
		console.log(`Successfully reloaded ${data.length} application (/) commands. (${commandFiles})`);
	} catch (error) {
		console.error(error);
	}
})();