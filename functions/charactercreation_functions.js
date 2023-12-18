const {
  EmbedBuilder,
} = require('discord.js');
const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf",
"Half-Orc", "Tiefling", "Aarakocra", "Aasimar", "Leonin", "Satyr", "Owlin", "Genasi", "Bugbear",
"Centaur", "Changeling", "Deep Gnome", "Duergar", "Eladrin", "Fairy", "Firbolg",
"Githyanki", "Githzerai", "Goblin", "Goliath", "Harengon", "Hobgoblin", "Kenku",
"Kobold", "Lizardfolk", "Minotaur", "Orc", "Sea Elf", "Shadar-kai", "Shifter", "Tabaxi",
"Tortle", "Triton", "Yuan-ti", "Kalashtar", "Warforged", "Autognome", "Giff", "Hadozee",
"Plasmoid", "Thri-kreen", "Loxodon", "Simic Hybrid", "Vedalken",
"Verdan", "Locathah", "Kender", "Grung"];
const classes = ["Fighter", "Cleric", "Wizard", "Rogue", "Barbarian", "Bard", "Druid", "Monk", "Paladin",
"Ranger", "Sorcerer", "Warlock", "Wizard", "Artificer", "Blood Hunter"];

function rollForStat(interaction){
  // Create an array to store the dice rolls
  const rolls = [];
  let sum
  let roll
if (interaction.options.getSubcommand() === 'official_random_abilities'){
  // Roll the dice 4 times
  for (let i = 0; i < 4; i++) {
     roll = Math.floor(Math.random() * 6) + 1;
    while(roll === 1) {
        roll = Math.floor(Math.random() * 6) + 1;
    }
    rolls.push(roll);  
}
   // Sort the rolls in ascending order
  rolls.sort((a, b) => a - b);

  // Drop the lowest roll
  rolls.shift();

  // Add the remaining rolls together
  sum = rolls.reduce((total, roll) => total + roll, 0);
}
  else{
    sum = Math.floor(Math.random() * 20 + 1)
  }
  

  sumRolls = String(rolls);
  sumRolls = sumRolls.replaceAll(",", " + ");
  sumRolls = "(" + sumRolls + ")";

  rollsarray = {
    allrolls: sumRolls,
    total: sum
  }
  console.log(rollsarray)
  // Return the sum
  return rollsarray
}

function generateRandomCharacter(interaction) {
    let race;
    let characterClass;
    let strength;
    let dexterity;
    let constitution;
    let intelligence;
    let wisdom;
    let charisma;
  
     race = races[Math.floor(Math.random() * races.length)];
     characterClass = classes[Math.floor(Math.random() * classes.length)];
     strength = rollForStat(interaction);
     dexterity = rollForStat(interaction);
     constitution = rollForStat(interaction);
     intelligence = rollForStat(interaction);
     wisdom = rollForStat(interaction);
     charisma = rollForStat(interaction);
  //}
  
    if (interaction.options.getSubcommand() === 'official_random_abilities'){
      strength = strength.allrolls + "\n" + strength.total,
            dexterity = dexterity.allrolls + "\n" + dexterity.total,
            constitution = constitution.allrolls + "\n" + constitution.total,
            intelligence = intelligence.allrolls + "\n" + intelligence.total,
            wisdom = wisdom.allrolls + "\n" + wisdom.total,
            charisma = charisma.allrolls + "\n" + charisma.total
    }
  else{
    strength = strength.total;
    dexterity = dexterity.total;
    constitution = constitution.total;
    intelligence = intelligence.total;
    wisdom = wisdom.total;
    charisma = charisma.total;
  }

    // Create a new character object with the random values
    const character = {
        race: race,
        class: characterClass,
        abilities: {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma
        }
    };

    return character;
}

module.exports = {
  randomCharacter: function random_character(interaction){
    const randomCharacter = generateRandomCharacter(interaction);
    const race = randomCharacter.race
    const races  = require('.././images/dnd-races.json');
    raceImageUrl = races[race];
    const characterEmbed = new EmbedBuilder()
              .setColor("Red")
              .setTitle("Random character")
              .addFields(
                  { name: 'Race', value: randomCharacter.race, inline: true},
                  { name: 'Class', value: randomCharacter.class, inline: true},
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Charisma', value: String(randomCharacter.abilities.charisma), inline: true},
                  { name: 'Constitution', value: String(randomCharacter.abilities.constitution), inline: true},
                  { name: 'Dexterity', value: String(randomCharacter.abilities.dexterity), inline: true},
                  { name: 'Intelligence', value: String(randomCharacter.abilities.intelligence), inline: true},
                  { name: 'Strength', value: String(randomCharacter.abilities.strength), inline: true},
                  { name: 'Wisdom', value: String(randomCharacter.abilities.wisdom), inline: true},
              )
              .setImage(raceImageUrl)
    return interaction.reply({content: "Here is your brand new character:", embeds: [characterEmbed] });
  }
}