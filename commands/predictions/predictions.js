var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();
const { MessageEmbed } = require('discord.js');

const { set_pred_message } = require("../../utils.js");
const utils = require("../../utils.js");
const SQL = utils.SQL

async function predictions(msg, args) {
    ergast.getRace("current", "next", async function(err, race){
        if(err) return await utils.send(msg, {content: "Race not found"})
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

        let raceStartsAt = new Date(date+" "+time)
        raceStartsAt.setHours(raceStartsAt.getHours() - 1)
        let diff = raceStartsAt - new Date()
        let hours = diff / (1000*60*60)

        time = time.substring(0, time.length-4);
        time = time.replace(':', 'h')

        let row = [seasonYear, round, gp, circuitName, city, country, date.replaceAll('-', '/'), time];
        data.push( row );
        
        var ret = `${row[2]} - ${row[4]}, ${row[5]}\n${row[6]} ${row[7]}`

        let race_id = `${race["season"]}${race["round"]}`;
       
        let author = msg.author
        let user_id = args[0] || author.id
        user_id = user_id.replace(/\D/g, "")
    
        try{ var user = (await msg.guild.members.fetch(user_id)).user }
        catch(error) { var user = msg.author }

        let value = await SQL.get_preds([user_id, race_id]);
        if (value == undefined){
            if (user_id == author.id){
                if (hours < 1) return utils.send(msg, {content: "You can register and modify your prediction until one hour before the beginning of the race !"})
                pred = []
                for (let i=0; i<20; i++){
                    pred.push("NaN");
                }

                await SQL.add_user([user_id, race_id])
                let message = await author.send({content: set_pred_message(pred)})
                await SQL.update_message_id([message.id, user_id, race_id])
                return await utils.send(msg, {content: `${author} registered`})
            }
            return utils.send(msg, {content: `${args[0]} is not registered for the next race`})
        }

        pred = eval(value["pred"]);

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(user.tag, await user.avatarURL())
        .setTitle("Race: ")
        .setDescription(ret)
        .addFields(
            { name: 'Prediction:', value: utils.set_pred_message(pred, false), inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: '\u200B', value: '\u200B', inline: true}
        )
        .setTimestamp()
        
        utils.send(msg, {embeds: [embed]})
    })
}

module.exports = async function (msg, args){
    await predictions(msg, args)
}
