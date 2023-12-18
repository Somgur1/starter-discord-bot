const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  roll_dice: function(message_split, msg){
    dice_roll = null;
    userCommand = message_split[1];
    dice_roll = message_split[1];
    if (dice_roll == null){
      return msg.reply("Please enter a dice to roll");
    }
    var url = 'https://rolz.org/api/?' + dice_roll + '.json';
    fetch(url)
        .then(response => {
          return response.json();
        })
        .then(user => {
          var result = String(user["result"]);
          const diceEmbed = new EmbedBuilder()
              .setColor(0x0099FF)
              .setTitle('Dice roller')
              .addFields(
                  { name: 'input', value: user["input"] },
                  { name: 'result', value: result, inline: true },
                  { name: 'details', value: user["details"], inline: true }
              );
          msg.reply({ embeds: [diceEmbed] });
        })
        .catch((error) => {
          msg.reply("Invalid input");
        });
  },
  roll_dice_slash_command: function(interaction){
    const dice = interaction.options.getString('dice');
    const url = 'https://rolz.org/api/?' + dice + '.json';
    fetch(url)
        .then(response => {
          return response.json();
        })
        .then(user => {
          var result = String(user["result"]);
          const diceEmbed = new EmbedBuilder()
              .setColor('Red')
              .setTitle('Dice roller')
              .addFields(
                  { name: 'input', value: user["input"] },
                  { name: 'result', value: result, inline: true },
                  { name: 'details', value: user["details"], inline: true }
              );
          interaction.reply({ embeds: [diceEmbed] });
        })
        .catch((error) => {
        });
  }
}

