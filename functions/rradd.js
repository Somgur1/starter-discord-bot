var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dnd_bot",
  charset: 'utf8mb4' // Add charset to support emojis
});
const emojiRegex = require('emoji-regex');
const fs = require('fs');

module.exports = {
    rradd: function(message_split, msg, server_id, SomgurId){
        if(msg.author.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return msg.reply("You cant make this command. You need to have the role `DM`.");
            }
        }
        RoleName = message_split[1];
        Reaction = message_split[2];
        RoleName = RoleName.replaceAll('-', ' ');
        if (!Reaction){
            return msg.reply("Invalid input");
        }
        const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
        if (msg.guild.roles.cache.find(role => role.name === RoleName)){
            myRole = msg.guild.roles.cache.find(role => role.name === RoleName);
            myRole = myRole.id;
        }
        else{
            return msg.reply(`Role (${RoleName}) does not exist`);
        }
        db.get(server_id).then(value => {
            value_check = null;
            value_check = value;
            if (value_check == null){
                return console.log("Use the command '!rrcreate' first");
            }
            objectvalue = Object.values(value.commands);
            result = objectvalue.find(playlist => playlist.roleId == myRole);
            try {
                if (result.roleId == myRole){
                    return msg.reply(`Role (${RoleName}) already exists`);
                }
            }
            catch (error) {
            }
            role_name = msg.guild.roles.cache.get(myRole);
            if(!role_name.editable){
                return msg.reply(`I cant edit that role (${RoleName}).`);
            }
            if (match){
                const [, animated, name, emid] = match;
                Reactionfind = match[2];
            }
            else{
                Reactionfind = Reaction;
            }
            result = objectvalue.find(playlist => playlist.reaction == Reactionfind);
            try {
                if (result.reaction == Reactionfind){
                    return msg.reply(`Reaction (${Reaction}) already exists`);
                }
            }
            catch (error) {
            }
            rrmessageid = value.messageid;
            msg.channel.messages.fetch(rrmessageid)
                .then(message => {
                    if (match){
                        const [, animated, name, emid] = match;
                        Reaction = match[0];
                    }
                    message.edit(message.content + "\n" + RoleName + " = " + Reaction);
                    message.react(Reaction);
                })
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
            reactionroleJSON = {
                "messageId" : rrmessageid,
                "reaction" : Reaction,
                "roleId" : myRole,
                "roletree": role_name,
            };
            value.commands.push(reactionroleJSON);
            db.set(server_id, value);
        })
            .catch(error => {
                console.log(error);
            })
    },
    rraddCommand: function(interaction, SomgurId){
        if(interaction.user.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return interaction.reply("You cant make this command. You need to have the role `DM`.");
            }
        }
        server_id = interaction.guildId;
        const role = interaction.options.getRole('role_to_add');
        roleId = role.id;
        reaction = interaction.options.getString('emoji');
    const match = /<(a?):(.+):(\d+)>/u.exec(reaction);
      const emReg = emojiRegex();
    var firstEmoji = reaction.match(emReg);
    if (!firstEmoji){
      if (!match){
        return interaction.reply({ content: `Invalid emoji (${reaction})`, ephemeral: true })
    }
      else{
      reaction = match[0];
      }
  }
      else{
      reaction = firstEmoji[0];
    }
    
        // db.get(server_id).then(value => {
            fs.readFile(`json/reactRoles_${server_id}.json`, 'utf8', (err, value) => {
            value = JSON.parse(value);
            console.log(value)
            value_check = null;
            value_check = value;
            if (value_check == null){
                return interaction.reply({content: "Use the command `!rrcreate new_message` first", ephemeral: true});
            }
            rrcommands = Object.values(value.commands);
            rrresult = rrcommands.find(coolRole => coolRole.roleId == roleId);
try{
                if(rrresult.roleId == roleId){
                    return interaction.reply({ content: `Role (${role}) already exists`, ephemeral: true});
                }
}
          catch (error) {
            }
            
            if(!role.editable){
              console.log("Editable is not");
                return interaction.reply({ content: `I cant edit that role (${role}).`, ephemeral: true });
            }
            if (match){
                const [, animated, name, emid] = match;
                Reactionfind = match[2];
            }
            else{
                Reactionfind = reaction;
            }
            result = rrcommands.find(emoji => emoji.reaction == Reactionfind);
            try {
                if (result.reaction == Reactionfind){
                    return interaction.reply({content: `Reaction (${reaction}) already exists`, ephemeral: true });
                }
            }
            catch (error) {
            }
            rrmessageid = value.messageid;
            interaction.channel.messages.fetch(rrmessageid)
                .then(message => {
                    if (match){
                        const [, animated, name, emid] = match;
                        Reaction = match[0];
                    }
                    message.edit({content: message.content + "\n" + `${role}` + " = " + reaction, "allowedMentions": { "users" : []}});
                    message.react(reaction);
                })
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
          else{
            Reaction = reaction;
          }
            reactionroleJSON = {
                "messageId" : rrmessageid,
                "reaction" : Reaction,
                "roleId" : roleId,
                "roletree": role,
            };
            value.commands.push(reactionroleJSON);
            // db.set(server_id, value);
            fs.writeFile(`json/reactRoles_${server_id}.json`, JSON.stringify(value, null, 4), (err) => {
                if (err) throw err;
                console.log('rrcommands has been written to rrcommands.json');
            });
            // fs.writeFile(`json/reactRoles_${server_id}.json`, JSON.stringify(rrcommands, null, 2), (err) => {
            //     if (err) throw err;
            //     console.log('rrcommands has been written to rrcommands.json');
            // });

          interaction.reply({ content: 'Created your reaction role', ephemeral: true });
        })
            
    
    }
}