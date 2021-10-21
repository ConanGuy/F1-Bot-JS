require('dotenv').config();
const preds_threads = require("./score.js")

const TOKEN = process.env.TOKEN;

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
client.login(TOKEN);

client.on("ready", botReady);


function botReady(){
    const date = new Date();
    console.log(`[${date.toUTCString()}] ${client.user.username} has connected to Discord\n`);

    const interval = 2 * 1000; // Every 10min
    var thread_results = function() {
        setInterval(function() {
            preds_threads.get_new_results(client);
        }, interval);
    }

    thread_results()
}

const commandHandler = require("./commands/commands");

client.on("messageCreate", getMessage);

function getMessage(message){
    if(message.author.bot) return
    else if(message.channel instanceof Discord.DMChannel){
        let dmpred = require("./dm_commands/predictions");
        dmpred(message)
    }
    else{
        commandHandler(message);
    }
}