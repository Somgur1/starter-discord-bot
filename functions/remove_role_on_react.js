const fs = require('fs');
module.exports = {
  remove_role_react: function(reaction, user, client){
    reactionName = reaction._emoji.name;
    msgId = reaction.message.id;
    serverId = reaction.message.guildId;
    fs.readFile(`json/reactRoles_${server_id}.json`, 'utf8', (err, value) => {
      value_check = null;
      value_check = value;
      if (value_check == null){
        return;
      }
      value = JSON.parse(value);
      objectvalue = Object.values(value.commands);
      result = objectvalue.find(reaction => reaction.reaction == reactionName);
      try {
        reactionName = result.reaction;
        reactionMessageId = result.messageId;
        reactionRoleId = result.roleId;
        role_tree = result.roletree;
        role_name = role_tree.name;
        var guild = client.guilds.cache.get(serverId);
        role_check = guild.roles.cache.find((r) => r.name === role_name);
        if(!role_check.editable) return;
        if (reactionMessageId == msgId ){
          reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRoleId);
        }
      }
      catch (error) {
        console.log(error);
        console.log(result);
      }
    })
  }
}