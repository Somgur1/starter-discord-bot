const { SlashCommandBuilder } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const party_functions = require('./../functions/party_functions');

module.exports = {
data: new SlashCommandBuilder()
		.setName('deletemember')
		.setDescription('Delete a member')
		.addStringOption(option =>
			option
        .setName('partyname')
				.setDescription('Choose a party (that you made) to delete the member of.')
				.setAutocomplete(true)
        .setRequired(true)
                    )
  .addStringOption(option =>
		option
      .setName('name_of_member')
			.setDescription('Name of the member you want to delete')
			.setRequired(true)
                  ),
  async execute(interaction) {
    party_functions.delete_member(interaction);
	},
  
}