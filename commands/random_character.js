const { SlashCommandBuilder } = require('discord.js');
const charactercreation_functions = require('./../functions/charactercreation_functions');
const characterFunctions = require('./../functions/charactercreation_functions');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('random_character')
		.setDescription('Create a random D&D character')
  .addSubcommand(subcommand =>
		subcommand
                 .setName("complete_random_abilites")
                 .setDescription("Create a character with Complete random ability numbers.")
                 )
  .addSubcommand(subcommand =>
		subcommand
                 .setName("official_random_abilities")
                 .setDescription("Create character with official random ability numbers. (4d6)")
                 )
  ,
	async execute(interaction) {
		charactercreation_functions.randomCharacter(interaction);
	},
};