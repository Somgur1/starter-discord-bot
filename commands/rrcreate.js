const { SlashCommandBuilder } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const rrNewFunctions = require('./../functions/rrcreate');
const rrOldFunctions = require('./../functions/rradd')
const SomgurID = "445177838426128384";



module.exports = {
data: new SlashCommandBuilder()
		.setName('rrcreate')
		.setDescription('Create a message with reaction roles')
  .addSubcommand(subcommand =>
		subcommand
			.setName('new_message')
			.setDescription('Create a new message')	
  .addChannelOption(option =>
    option.setName("channel_name")
    .setRequired(true)
    .setDescription("What channel do you want to add the message to.")
    )
    .addRoleOption((option) =>
    option
                 .setName("role_to_add")
                 .setDescription("What role to you want to add to reaction roles?")
                 .setRequired(true)
  )
    .addStringOption(option =>
      option
                     .setName("emoji")
                     .setDescription("What emoji do you want to use?")
                     .setRequired(true)
                  
                    )
  .addStringOption(option =>
    option.setName("are_you_sure")
    .setDescription("This will overwrite your exsiting message (if you have one). Are you sure?")
    .setRequired(true)
    .addChoices(
				{ name: 'Yes', value: "true" },
			)))
    
  .addSubcommand(subcommand =>
		subcommand
			.setName('old_message')
			.setDescription('Add a role to the existing message')
                 .addRoleOption((option) =>
    option
                 .setName("role_to_add")
                 .setDescription("What role to you want to add to reaction roles?")
                 .setRequired(true)
  )
                .addStringOption(option =>
      option
                     .setName("emoji")
                     .setDescription("What emoji do you want to use?")
                     .setRequired(true)
                  
                    ))
      ,
  async execute(interaction) {
     if (interaction.options.getSubcommand() === 'old_message'){
       rrOldFunctions.rraddCommand(interaction, SomgurID)
     }
    else{
      rrNewFunctions.rrcreateCommand(interaction, SomgurID)
    }
    
	},
  
}