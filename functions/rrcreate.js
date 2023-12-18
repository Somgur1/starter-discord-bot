
const Client = require("@replit/database");
const db = new Client();
const fs = require('fs');
// const db = new Database();
// const db = new Client();
const emojiRegex = require('emoji-regex');
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dnd_bot",
//   charset: 'utf8mb4' // Add charset to support emojis
// });


module.exports = {
    rrcreate: function(message_split, msg, server_id, SomgurId){
        if(msg.author.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return msg.reply("You cant make this command");
            }
        }
        RoleName = message_split[1];
        Reaction = message_split[2];
        if (!Reaction){
            return msg.reply("Invalid input");
        }
        RoleName = RoleName.replaceAll('-', ' ');
        const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
        if (msg.guild.roles.cache.find(role => role.name === RoleName)){
            myRole = msg.guild.roles.cache.find(role => role.name === RoleName);
            role_name = myRole;
            myRole = myRole.id;
        }
        else{
            return msg.reply(`Role (${RoleName}) does not exist`);
        }
        if(!role_name.editable){
            return msg.reply(`I cant edit that role (${RoleName}).`);
        }
        msg.channel.send("Reaction roles \n" + RoleName + " = " + Reaction).then(sent => {
            let id = sent.id;
            sent.react(Reaction);
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
            db.get(server_id).then(value => {
                try{
                    party = value.party;
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
                        ],
                        party
                    };
                }
                catch (error) {
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
                        ],
                        "party":
                            []
                    };
                }
                db.set(server_id, rrcommands);
            });
        });
    },
    rrcreateCommand: function(interaction, SomgurId){
        if(interaction.user.id != SomgurId){
                if (interaction.user.roles.cache.some(role => role.name !== 'DM')) {
                    return interaction.reply("You cant make this command");
                }
            }
            const role = interaction.options.getRole('role_to_add');
            roleName = role.name;
            roleId = role.id;
          
            roleCheck = interaction.guild.roles.cache.find(role => role.name === roleName);
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
            const channel = interaction.options.getChannel('channel_name')
            server_id = interaction.guildId;
            if(!role.editable){
                return interaction.reply(`I cant edit that role (${roleName}).`);
            }
           channel.send({content: `Reaction roles` + `\n` +  `${role}  = ` + reaction, "allowedMentions": { "users" : []}}).then(sent => {
                let id = sent.id;
             try{
                sent.react(reaction);
             }
             catch (error) {
               return interaction.reply({ content: `Invalid emoji (${reaction})`, ephemeral: true });
             }
                if (match){
                    const [, animated, name, emid] = match;
                    reaction = match[2];
                }
                // db.get(server_id).then(value => {
                    // try{
                    //     party = value.party;
                    //     rrcommands = {
                    //         "server":server_id,
                    //         "messageid": id,
                    //         "commands":[
                    //             {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                    //         ],
                    //         party
                    //     };
                    // }
                    // catch (error) {
                        rrcommands = {
                            "server":server_id,
                            "messageid": id,
                            "commands":[
                                {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                            ],
                            "party":
                                []
                        };

                        fs.writeFile(`json/reactRoles_${server_id}.json`, JSON.stringify(rrcommands, null, 4), (err) => {
                            if (err) throw err;
                            console.log('rrcommands has been written to rrcommands.json');
                        });
                    // }
                    // db.set(server_id, rrcommands);
                  console.log("after db Set")
                  console.log(rrcommands)
                  interaction.reply({ content: 'Created your reaction role', ephemeral: true });
                // });
            });
      }
}

// db.get(server_id).then(value => {
                // try{
                //     party = value.party;
                //     rrcommands = {
                //         "server":server_id,
                //         "messageid": id,
                //         "commands":[
                //             {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                //         ],
                //         party
                //     };
                // }
                // catch (error) {
                //     rrcommands = {
                //         "server":server_id,
                //         "messageid": id,
                //         "commands":[
                //             {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                //         ],
                //         "party":
                //             []
                //     };
                // }

                // var commands = {
                //     "messageId":id,
                //     "reaction": reaction,
                //     "roleId":roleId,
                //     "roletree": role
                // }
                // var commandsJson = JSON.stringify(commands);
                // con.connect(function(err) {
                //     if (err) throw err;
                //     console.log("Connected!");
                //     var con = `INSERT INTO react_roles (server, messageid, commands) VALUES ('${server_id}', '${id}'), '${commandsJson}'`;
                //     con.query(sql, function (err, result) {
                //       if (err) throw err;
                //       console.log("1 record inserted");
                //     });
                //   });

                // var commands = {
                //     "messageId": message_id,
                //     "reaction": reaction,
                //     "roleId": roleId,
                //     "roletree": role
                //   };
                //   console.log(reaction);
                //   var commandsJson = JSON.stringify(commands);
                //   console.log(`Serverid: ${server_id} (445180187358003220)`);
                //   console.log(`MessageID: ${message_id}`);
                //   console.log(`RoleID: ${roleId} (1039631188102483998)`);
                  
                //   var sql = `INSERT INTO react_roles (server, messageid, commands) VALUES (${server_id}, ${message_id}, '${commandsJson}')`;
                  
                //   mysqlLib.getConnection(function(err, sql) {
                //     if (err) {
                //       console.error('Error inserting data: ' + err.message);
                //     } else {
                //       console.log('Data inserted successfully.');
                //     }
                //   });