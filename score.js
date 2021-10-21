var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();
const { MessageEmbed } = require('discord.js');

const utils = require("./utils");
const SQL = utils.SQL;
let zip= (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))

function get_pred_cons_distance(result, pred){
    let distance = 0
    let pCopy = pred.slice()
    for (const [index, value] of result.entries()){
        let idx = pCopy.indexOf(value)
        distance += idx == -1 ? 21 : Math.abs(index-idx)
        if (idx != -1) pCopy[idx] = 'NaN'
    }
    return 200-distance
}

function get_pred_cons_good(result, pred){
    let distance = 0
    for (const [index, value] of result.entries()){
        distance += result[index] == pred[index] ? 1 : 0
    }
    return distance
}


function get_pred_drivers_good(result, pred){
    let distance = 0
    for (const [index, value] of result.entries()){
        distance += result[index] == pred[index] ? 1 : 0
    }
    return distance
}

function get_pred_drivers_distance(result, pred){
    let distance = 0
    for (const [index, value] of result.entries()){
        let idx = pred.indexOf(value)
        distance += idx == -1 ? 20 : Math.abs(index-idx)
    }
    return 200-distance
}

async function send_result(client){
    let res = await SQL.get("SELECT MAX(race_id) as max_race_id, * FROM RACES_RESULTS WHERE status = 1")
    if (res["race_id"] === null){
        return
    }

    let race_id = res["race_id"].toString()

    let drivers = eval(res["drivers"])
    let constructors = eval(res["constructors"])

    let guildsManager = await client.guilds.fetch()
    for (const g of guildsManager){
        let guild = await client.guilds.fetch(g[0])
        let members = await guild.members.list({limit:1000})

        let ids = []  
        let membersList = {}      
        for (const m of members){
            let member = await guild.members.fetch(m[0])
            ids.push(member.id)

            membersList[member.id] = member.user
        }

        let stand = await SQL.all("SELECT ROW_NUMBER() OVER (ORDER BY points DESC) as rank, * FROM TOTAL_SCORE WHERE race_id="+race_id+" and user_id in ("+ids+")")
        let chan = await SQL.get("SELECT channel_id FROM PREDS_CHANNEL WHERE guild_id = "+guild.id)
        
        let channel
        try { 
            channel = await guild.channels.fetch(chan["channel_id"].toString())
        }
        catch (err){
            channel = utils.get_default_channel(guild)
        }

        let str = ""
        for (const s of stand){
            let rank = s["rank"]
            let user_id = s["user_id"]
            let points = s["points"]
            str += `${rank}- ${membersList[user_id].username} (${points} points)\n`
        }
        str = str.substring(0, str.length - 1)

        const embed = new MessageEmbed()
        .setTitle("Ranking: ")
        .addFields(
            { name: 'Ranks', value: str}
        )
        .setTimestamp()

        channel.send({embeds: [embed]})
    }
}

async function get_new_results(client){
    let res = await SQL.get("SELECT MAX(race_id) as race_id FROM RACES_RESULTS WHERE status = 0")
    if (res["race_id"] === null){
        return
    }

    let race_id = res["race_id"].toString()

    let year = race_id.substr(0, 4)
    let round = race_id.substr(4, 2)

    ergast.getRaceResults(year, round,async function(err, results){
        if (results === undefined){
            return
        }

        let driversRes = []
        let consRes = []
        let drivers = []
        let cons = []
        for (const driver of results["driverResults"]){
            let d = driver["driver"]
            let c = driver["constructor"]

            driversRes.push(`'${d["code"]}'`)
            consRes.push(`'${c["constructorId"]}'`)

            drivers.push(d["code"])
            cons.push(c["constructorId"])
        }
        let driverCons = zip(drivers, cons)

        let preds = await SQL.all("SELECT * FROM PREDICTIONS WHERE race_id = "+race_id)

        for (const p of preds){
            let pred = eval(p["pred"])

            let predCons = []
            for (const [i, pr] of pred.entries())
                predCons.push(drivers.includes(pr) ? driverCons[drivers.indexOf(pr)][1] : "NaN")

            let cDist = get_pred_cons_distance(cons, predCons)
            let cGood = get_pred_cons_good(cons, predCons)
            let dDist = get_pred_drivers_distance(drivers, pred)
            let dGood = get_pred_drivers_good(drivers, pred)

            let user_id = p["user_id"]
            let race_id = p["race_id"]

            let user_exists = await SQL.get("SELECT * FROM PREDS_SCORES WHERE race_id = ? and user_id = ?", [race_id, user_id])
            if (user_exists === undefined)
                await SQL.run("INSERT INTO PREDS_SCORES VALUES(?, ?, ?, ?, ?, ?)", [user_id, race_id, dDist, dGood, cDist, cGood])
            else
                await SQL.run("UPDATE PREDS_SCORES SET drivers_distance = ?, drivers_good = ?, cons_distance = ?, cons_good = ? WHERE user_id = ? and race_id = ?", [dDist, dGood, cDist, cGood, user_id, race_id])
        }  
        
        await SQL.get("UPDATE RACES_RESULTS SET drivers = ?, constructors = ?, status = 1 WHERE race_id = ?", ["["+driversRes.toString()+"]", "["+consRes.toString()+"]", race_id])
        await SQL.get("INSERT INTO RACES_RESULTS(race_id) VALUES(?)", [year+(parseInt(round)+1)])

        await send_result(client)
    })
}

module.exports = {
    get_new_results: get_new_results,
    send_result: send_result
}