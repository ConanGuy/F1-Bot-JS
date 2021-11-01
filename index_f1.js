require('dotenv').config();
const preds_threads = require("./threads.js")
const utils = require("./utils");
const SQL = utils.SQL;
const help = require("./commands/help.js")

const TOKEN = process.env.TOKEN;

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
client.login(TOKEN);

client.on("ready", botReady);


async function botReady(){
    const date = new Date();
    console.log(`[Logs @${date.toUTCString()}] ${client.user.username} has connected to Discord\n`);

    preds_threads.get_new_results(client)
    preds_threads.set_schedule(client)

    const interval = 3 * 60 * 1000; // Every 10min
    var thread_results = function() {
        setInterval(function() {
            preds_threads.get_new_results(client);
        }, interval);
    }

    const interval_warning = 30 * 60 * 1000; // Every 30min
    var thread_warning = function() {
        setInterval(function() {
            preds_threads.set_schedule(client);
        }, interval_warning);
    }

    thread_results()
    thread_warning()
}

const commandHandler = require("./commands/commands");

client.on("messageCreate", getMessage);

async function getMessage(message){
    if(message.author.bot) return
    else if(message.channel instanceof Discord.DMChannel){
        let dmpred = require("./dm_commands/predictions");
        dmpred(message)
    }
    else{
        commandHandler(message);
    }
}

//joined a server
client.on("guildCreate", guildJoin)

async function guildJoin(guild){
    let res = await SQL.get("SELECT * FROM PREDS_CHANNEL WHERE guild_id = "+guild.id)
    if (res === undefined){
        let channel = await utils.get_default_channel(guild)
        await SQL.get("INSERT INTO PREDS_CHANNEL VALUES(?, ?)",[guild.id, channel.id])
    }
}

// https://discord.com/api/oauth2/authorize?client_id=892318238355095562&permissions=3072&scope=bot