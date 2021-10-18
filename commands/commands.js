const schedule = require("./schedule.js");
const result = require("./result.js");
const drivers = require("./drivers.js");
const constructors = require("./constructors.js");
const driversStandings = require("./driversStandings.js");
const constructorsStandings = require("./constructorsStandings.js");
const qualifs = require("./qualifs.js");
const pitstops = require("./pitstops.js");
const next = require("./next.js");

const utils = require("./utils.js")
const command_prefix = ["f1.", "F1."]

commands = {
    schedule: schedule,
    sched: schedule,
    s: schedule,
    
    result: result,
    res: result,
    r: result,
    
    drivers: drivers,
    d: drivers,
    
    constructors: constructors,
    c: constructors,
    
    scoreboard: driversStandings,
    sb: driversStandings,
    
    scoreboard_constructor: constructorsStandings,
    sbc: constructorsStandings,
    
    qualifs: qualifs,
    q: qualifs,

    pitstops: pitstops,
    ps: pitstops,

    next: next,
    n: next
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
            commands[command](msg, tokens);

            break;
        } 
    }
}