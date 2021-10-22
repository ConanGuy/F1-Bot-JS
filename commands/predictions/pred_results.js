const utils = require("../../utils.js");
const SQL = utils.SQL
const { MessageEmbed } = require('discord.js');
var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

async function pred_results(msg, args) {
    let argsDict = utils.manage_arguments(args);
    
    let year = argsDict["-y"] || "";
    let round = year == "" ? "" : argsDict["-r"] || "";

    let arg0 = args[0] || ""
    arg0 = arg0.replace(/\D/g, "")
    
    try{
        if(arg0 == "") throw "Error"
        var user = (await msg.guild.members.fetch(arg0)).user
        var user_id = user.id
    }
    catch(error) {
        var user_id =  argsDict["-u"] || msg.author.id
        user_id = user_id.replace(/\D/g, "")
        
        try{ var user = (await msg.guild.members.fetch(user_id)).user }
        catch(error) { var user = msg.author }
    }

    let res = await SQL.get("SELECT MAX(race_id) as max_r, * FROM ALL_RESULTS WHERE race_id LIKE '"+year+"%"+round+"' AND user_id = "+user_id)
    if (res["max_r"] === null){
        return await utils.send(msg, {content: "No race found for user "+user.toString()})
    }
    
    let pred = eval(res["pred"])
    let dResult = eval(res["drivers"])

    let dDist = res["drivers_distance"]
    let dGood = res["drivers_good"]
    let total = res["points"]
    
    ergast.getRace("current", "next", async function(err, race){
        try{
            let data = [];
            data.push(["Season", "Round", "Grand Prix", "Circuit", "City", "Country", "Date", "Time"]);

            let seasonYear = race["season"];
            let round = race["round"];
            let gp = race["raceName"];
            let circuit = race["circuit"];
            let circuitName = circuit["circuitName"];
            let location = circuit["location"];
            let city = location["locality"];
            let country = location["country"];
            let date = race["date"];
            let time = race["time"];
            time = time.substring(0, time.length-4);
            time = time.replace(':', 'h')

            let row = [seasonYear, round, gp, circuitName, city, country, date.replaceAll('-', '/'), time];
            data.push( row );
            
            var ret = `${row[2]} - ${row[4]}, ${row[5]}\n${row[6]} ${row[7]}`
        }
        catch(error){
            await utils.send(msg, {content: "Unknow error"});
        }
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(user.tag, await user.avatarURL() || user.defaultAvatarURL)
        .setTitle("Race: ")
        .setDescription(ret)
        .addFields(
            { name: 'Prediction:', value: utils.set_pred_message(pred, false), inline: true},
            { name: 'Result:', value: utils.set_pred_message(dResult, false), inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'Distance points:', value: dDist.toString(), inline: true},
            { name: 'Good positions:', value: dGood.toString(), inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'Total:', value: total.toString()}
        )
        .setTimestamp()
        
        return await utils.send(msg, {embeds: [embed]})
    })
}

module.exports = async function (msg, args){
    await pred_results(msg, args)
}
