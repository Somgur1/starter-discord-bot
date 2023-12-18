const Database = require("@replit/database");
const db = new Database();
const {
    EmbedBuilder,
} = require('discord.js');
const global_functions = require("./global_functions");
const globalFunctions = require ('./global_functions');
function urlChecker(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}
module.exports = {
    party_create: function(interaction){
        const party_name = interaction.options.getString('partyname');
        isEditableByAnyone = interaction.options.getString('editable');
        if (isEditableByAnyone == "true"){
            isEditableByAnyone = true;
        }
        else{
            isEditableByAnyone = false;
        }
        const server_id = interaction.guildId;
        const user_id = interaction.user.id;
        db.get(server_id).then(value => {
            try{
                rrmessage_id = value.messageid;
                commands = value.commands;
                rrserver_id = value.server;
            }
            catch (error) {
                rrmessage_id = "";
                commands = "";
                rrserver_id = "";
            }
            try{
                party = value.party
            }
            catch (error) {
                party = "";
            }
            if(party == ""){
                dbJSON = {
                    "server": rrserver_id,
                    "messageid": rrmessage_id,
                    commands,
                    "party":[
                        {"partyname": party_name,
                            "dm" : user_id,
                            "editable" : isEditableByAnyone,
                            "partymembers":[]
                        }
                    ]
                };
            }
            else{
                partyadd = {
                    "partyname": party_name,
                    "dm" : user_id,
                    "editable" : isEditableByAnyone,
                    "partymembers":[]
                }
                value.party.push(partyadd)
                dbJSON = value;
            }
            db.set(server_id, dbJSON)
        });
        interaction.reply("Party `" + party_name +"` made.");
    },
    add_member: function(interaction){
        const server_id = interaction.guild.id;
        const userId = interaction.user.id;
        const party_name = interaction.options.getString('partyname_to_add');
        const party_member_name = interaction.options.getString('member_name');
        const party_member_class = interaction.options.getString('member_class');
        const party_member_race = interaction.options.getString('member_race');
        var party_member_image_url = interaction.options.getString('member_image');
        const player = interaction.options.getUser('player');
        if (player != null){
            playerName = player.username
        }
        else{
            playerName = null
        }
        if (party_member_image_url != null){
            if (!urlChecker(party_member_image_url)){
                return interaction.reply("Please enter a valid URL");
            }
        }
        db.get(server_id).then(DB => {
            objectvalue = Object.values(DB.party)
            result = objectvalue.find(party => party.partyname == party_name)
            number_in_db = globalFunctions.searchInDb(DB.party, party_name);
            isEditable = result.editable;
            dmOfParty = result.dm;
            if (!isEditable){
                if (dmOfParty != userId){
                    return interaction.reply("You cant add members to this party");
                }
            }
            const member_embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle(`Member ${party_member_name}`)
                .addFields(
                    { name: 'Name', value: party_member_name },
                    { name: 'Race', value: party_member_race, inline: true},
                    { name: 'Class', value: party_member_class, inline: true}
                )
                .setImage(party_member_image_url);
            party_member = {
                "player" : playerName,
                "name" : party_member_name,
                "class" : party_member_class,
                "race" : party_member_race,
                "image" : party_member_image_url
            }
            DB.party[number_in_db].partymembers.push(party_member);
            db.set(server_id, DB);
            interaction.reply({content: "Member`" + party_member_name +"` made.", embeds: [member_embed] });
        });
    },
    view_party: function(interaction){
        const party_name = interaction.options.getString('partyname_to_view');
        const server_id = interaction.guild.id;
        db.get(server_id).then(DB => {
            objectvalue = Object.values(DB.party);
            result = objectvalue.find(party => party.partyname == party_name);
            jsonString = global_functions.jsonToString(result.partymembers);
            return interaction.reply(result.partyname + "\n \n" + jsonString);
        });
    },
    delete_party: function(interaction){
        server_id = interaction.guild.id;
        const party_name = interaction.options.getString('partyname_to_delete');
        const userId = interaction.user.id;
        db.get(server_id).then(DB => {
            number_in_db = globalFunctions.searchInDb(DB.party, party_name);
            if (number_in_db == null){
                return interaction.reply("Party `" + party_name +"` not found");
            }
            const dm = DB.party[number_in_db].dm;
            if (userId != dm){
                return interaction.reply("You cant delete this party");
            }
            delete DB.party[number_in_db];
            partys = DB.party.filter(item => item != null);
            DB.party = partys;
            db.set(server_id, DB);
            interaction.reply({content: "you delet `" + party_name +"`" });
        });
    },
    delete_member: function(interaction){
        server_id = interaction.guild.id;
        const userId = interaction.user.id;
        const partyName = interaction.options.getString('partyname');
        const memberName = interaction.options.getString('name_of_member');
        db.get(server_id).then(DB => {
            number_in_db = globalFunctions.searchInDb(DB.party, partyName);
            if (number_in_db == null){
                return interaction.reply("Party `" + partyName +"` not found" );
            }
            const dm = DB.party[number_in_db].dm;
            if (userId != dm){
                return interaction.reply("You cant delete members in this party");
            }
            partyOfMember = DB.party[number_in_db];
            partyMemberCheck = partyOfMember.partymembers.find(member => member.name == memberName);
            console.log("partymembercheck:");
            console.log(partyMemberCheck);
            if(!partyMemberCheck){
                return interaction.reply("Party member `" + memberName +"` not found");
            }
            nameNumber = global_functions.searchInDb(DB.party[number_in_db].partymembers, memberName);
            delete DB.party[number_in_db].partymembers[nameNumber];
            partymembers = DB.party[number_in_db].partymembers.filter(item => item != null);
            DB.party[number_in_db].partymembers = partymembers;
            db.set(server_id, DB);
            interaction.reply({content: "you delet `" + memberName +"`" });
        });
    }
}