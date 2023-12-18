const { SlashCommandBuilder } = require('discord.js');
const party_functions = require('./../functions/party_functions');

module.exports = {
	data: new SlashCommandBuilder()
  .setName('membersview')
  .setDescription('View members of a party')
  .addStringOption((option) =>
			option.setName('partyname_to_view')
				.setDescription('Choose a party (that you made) to view members of')
				.setAutocomplete(true)
        .setRequired(true)
      ),
    async execute(interaction) {
    party_functions.view_party(interaction)
	},
}
