const { SlashCommandBuilder } = require('discord.js');
const party_functions = require('./../functions/party_functions');

module.exports = {
	data: new SlashCommandBuilder()
  .setName('memberadd')
  .setDescription('Add a member to a party')
  .addStringOption((option) =>
			option.setName('partyname_to_add')
				.setDescription('Choose a party (that you made) to add this member to')
				.setAutocomplete(true)
        .setRequired(true)
      )
  .addStringOption(option =>
		option.setName('member_name')
			.setDescription('Name of the party member')
			.setRequired(true)
                   )
  .addStringOption(option =>
		option.setName('member_class')
			.setDescription('Class of the party member')
			.setRequired(true)
                   )
    .addStringOption(option =>
		option.setName('member_race')
			.setDescription('Race of the party member')
			.setRequired(true)
                   )
    .addStringOption(option =>
		option.setName('member_image')
			.setDescription('URL of image of the party member. (Hint: You can use "Imgur.com" to host your image')
                   )
  .addUserOption(option =>
		option
			.setName('player')
			.setDescription("Who is the player of this member. (For DM's only)")
                ),
  
  async execute(interaction) {
    party_functions.add_member(interaction);
	},
}