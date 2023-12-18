const { SlashCommandBuilder } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const party_functions = require('./../functions/party_functions');

module.exports = {
data: new SlashCommandBuilder()
		.setName('deleteparty')
		.setDescription('Delete a party')
		.addStringOption((option) =>
			option
        .setName('partyname_to_delete')
				.setDescription('Choose a party (you made) to delete')
				.setAutocomplete(true)
      ),
	async autocomplete(interaction) {
		
	},
  async execute(interaction) {
    party_functions.delete_party(interaction);
	},
  
}