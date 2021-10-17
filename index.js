require('dotenv').config();

const TOKEN = process.env.TOKEN;

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
client.login(TOKEN);

client.on("ready", botReady);

function botReady(){
    const date = new Date();
    console.log(`[${date.toUTCString()}] TestBot has connected to Discord\n`);
}

const commandHandler = require("./commands/commands")

client.on("messageCreate", getMessage);

function getMessage(message){
    if(message.channel instanceof Discord.DMChannel){
        print("DM:"+message.content)
    }
    else{
        commandHandler(message)
    }
}