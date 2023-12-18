const { SlashCommandBuilder } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const party_functions = require('./../functions/party_functions');

module.exports = {
	data: new SlashCommandBuilder()
  .setName('partycreate')
  .setDescription('Creates a party')
  .addStringOption(option =>
		option.setName('partyname')
			.setDescription('Name of the party')
			.setRequired(true)
                   )
  .addStringOption(option =>
		option.setName('editable')
			.setDescription('Do you want anyone to add members')
			.setRequired(true)
      .addChoices(
					{ name: 'Yes', value: "true" },
					{ name: 'No', value: "false" },
      )),
  async execute(interaction) {
    party_functions.party_create(interaction);
	},
}