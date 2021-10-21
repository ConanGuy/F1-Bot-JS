const utils = require("../../utils.js");
const SQL = utils.SQL
const { MessageEmbed } = require('discord.js');
var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

async function command(msg, args) {
    let argsDict = utils.manage_arguments(args);
    
    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || "last";
    let global = argsDict["--global"] || false;

    ergast.getRace(year, round, async function(err, race){
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
            
            var desc = `${row[2]} - ${row[4]}, ${row[5]} - ${row[6]} ${row[7]}`
        }
        catch(error){
            return await utils.send(msg, {content: "Unknow error"});
        }

        let guild = msg.guild
        let members = await guild.members.list({limit:1000})

        let ids = []  
        let membersList = {}      
        for (const m of members){
            let member = await guild.members.fetch(m[0])
            ids.push(member.id)

            membersList[member.id] = member.user
        }
        
        let chan = await SQL.get("SELECT channel_id FROM PREDS_CHANNEL WHERE guild_id = "+guild.id)
        
        let channel
        try { 
            channel = await guild.channels.fetch(chan["channel_id"].toString())
        }
        catch (err){
            channel = utils.get_default_channel(guild)
        }

        if (year == "current") year = ""
        if (round == "last") round = ""

        if (!global){
            var standTot = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, points as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
            var standGood = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_good DESC) as rank, drivers_good as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
            var standDist = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_distance DESC) as rank, drivers_distance as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
        }
        else{
            var standTot = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, SUM(points) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id")
            var standGood = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_good DESC) as rank, SUM(drivers_good) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id")
            var standDist = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_distance DESC) as rank, SUM(drivers_distance) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id")
            desc = "Global ranking"
        }

        function get_stand_str(res){
            if (res.length == 0)
                return "No data found"
            let str = ""
            for (const s of res){
                let rank = s["rank"]
                let user_id = s["user_id"]
                let points = s["points"]
                var cnt = s["races"] || ""
                str += `${rank}- ${membersList[user_id].username} (${points} points)` + (cnt != "" ? " for "+cnt+" races" : "") + "\n"
            }
            return str.substring(0, str.length - 1)
        }

        let strTot = get_stand_str(standTot)
        let strGood = get_stand_str(standGood)
        let strDist = get_stand_str(standDist)

        const embed = new MessageEmbed()
        .setTitle("Ranking: ")
        .setDescription(desc)
        .addFields(
            { name: 'Ranks total:', value: strTot, inline: true},
            { name: 'Ranks good position:', value: strGood, inline: true},
            { name: 'Ranks distance:', value: strDist, inline: true}
        )
        .setTimestamp()

        await channel.send({embeds: [embed]})
    })
}

module.exports = async function (msg, args){
    await command(msg, args)
}
