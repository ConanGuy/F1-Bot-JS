const schedule = require("./infos/schedule.js");
const results = require("./infos/results.js");
const drivers = require("./infos/drivers.js");
const constructors = require("./infos/constructors.js");
const driversStandings = require("./infos/driversStandings.js");
const constructorsStandings = require("./infos/constructorsStandings.js");
const qualifs = require("./infos/qualifs.js");
const pitstops = require("./infos/pitstops.js");
const next = require("./infos/next.js");
const predictions = require("./predictions/predictions.js")
const pred_results = require("./predictions/pred_results.js")
const pred_stands = require("./predictions/pred_stands.js")
const channel = require("./settings/channel.js")
const help = require("./help.js")

const utils = require("../utils.js");

require('dotenv').config();
const command_prefix = process.env.PREFFIX.split(", ");

const commands = {
    schedule: schedule,
    s: schedule,
    
    results: results,
    r: results,
    
    drivers: drivers,
    d: drivers,
    
    constructors: constructors,
    c: constructors,
    
    scoreboard: driversStandings,
    sb: driversStandings,
    
    scoreboard_constructors: constructorsStandings,
    sbc: constructorsStandings,
    
    qualifs: qualifs,
    q: qualifs,

    pitstops: pitstops,
    pit: pitstops,

    next: next,
    n: next,

    predictions: predictions,
    p: predictions,

    pred_results: pred_results,
    pr: pred_results,

    pred_stands: pred_stands,
    ps: pred_stands,

    channel: channel,

    help: help, h: help
};

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    // Check for the prefix in the command
    for(var prefix of command_prefix){

        // If the prefix has been found at the very beginning of the message
        if(command.indexOf(prefix) == 0){
            command = command.replace(prefix, "");
            
            // Check if the command is exists
            if(!(command in commands)){
                return;
            }

            // Execute the command
            await commands[command](msg, tokens);

            break;
        } 
    }
}