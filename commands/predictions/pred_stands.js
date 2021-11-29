const utils = require("../../utils.js");
const SQL = utils.SQL
const { MessageEmbed } = require('discord.js');
var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

async function pred_stands(msg, args) {
    let argsDict = utils.manage_arguments(args);
    
    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || "last";
    let global = argsDict["--global"] || false;
    let top = argsDict["--top"] || false;

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
        catch(error) { 
            var user = msg.author
            top = true 
        }
    }

    let guild = msg.guild
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
            
            var desc = `${row[2]} - ${row[4]}, ${row[5]}\n${row[6]} ${row[7]}`
        }
        catch(error){
            return await utils.send(msg, {content: "Unknow error"});
        }

        let members = await guild.members.list({limit:1000})

        let ids = []  
        let membersList = {}      
        for (const m of members){
            let member = await guild.members.fetch(m[0])
            ids.push(member.id)

            membersList[member.id] = member
        }

        if (year == "current") year = ""
        if (round == "last") round = ""

        if (!global){
            var standTot = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, points as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
            var standGood = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_good DESC) as rank, drivers_good as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
            var standDist = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY drivers_distance DESC) as rank, drivers_distance as points, user_id FROM TOTAL_SCORE WHERE race_id = (SELECT MAX(race_id) FROM TOTAL_SCORE WHERE race_id LIKE '"+year+"%"+round+"') and user_id in ("+ids+")")
        }
        else{
            var standTot = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, * FROM (SELECT SUM(points) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id)")
            var standGood = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, * FROM (SELECT SUM(drivers_good) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id)")
            var standDist = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, * FROM (SELECT SUM(drivers_distance) as points, COUNT(user_id) as races, user_id FROM TOTAL_SCORE WHERE user_id in ("+ids+") GROUP BY user_id)")
            desc = "Global ranking"
        }

        let strTot = utils.get_stand_str(standTot, membersList, user_id, top)
        let strGood = utils.get_stand_str(standGood, membersList, user_id, top)
        let strDist = utils.get_stand_str(standDist, membersList, user_id, top)

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Ranking: ")
        .setDescription(desc)
        .addFields(
            { name: 'Ranks total:', value: strTot, inline: true},
            { name: 'Ranks good position:', value: strGood, inline: true},
            { name: 'Ranks distance:', value: strDist, inline: true}
        )
        .setTimestamp()

        if (!top) embed.setAuthor(user.tag, await user.avatarURL() || user.defaultAvatarURL)

        await utils.send(msg, {embeds: [embed]})
    })
}

module.exports = async function (msg, args){
    await pred_stands(msg, args)
}
