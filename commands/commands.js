const schedule = require("./schedule.js");
const results = require("./results.js");
const drivers = require("./drivers.js");
const constructors = require("./constructors.js");
const driversStandings = require("./driversStandings.js");
const constructorsStandings = require("./constructorsStandings.js");
const qualifs = require("./qualifs.js");
const pitstops = require("./pitstops.js");
const next = require("./next.js");
const predictions = require("./predictions.js")
const help = require("./help.js")

const utils = require("../utils.js");

const command_prefix = ["f1.", "F1."]

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
    ps: pitstops,

    next: next,
    n: next,

    predictions: predictions,
    p: predictions,

    help: help
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
                utils.send(msg, {content: `'${command}' command not found`});
                return;
            }

            // Execute the command
            await commands[command](msg, tokens);

            break;
        } 
    }
}