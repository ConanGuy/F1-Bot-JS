require('dotenv').config();

const TOKEN = process.env.TOKEN;

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
client.login(TOKEN);

client.on("ready", botReady);

function botReady(){
    console.log("I'm ready bitch");
}

client.on("messageCreate", getMessage);

function getMessage(message){
    console.log(message.content);
}