
const { MessageEmbed } = require('discord.js');
const utils = require("../utils.js");

const helpCommands = {
    "constructors": {
        "Aliases": ["constructors", "c"],
        "Description": ["Get details about constructors of a season"],
        "Options": ["-y YEAR", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "constructorsStandings": {
        "Aliases": ["scoreboard_constructors", "sbc"],
        "Description": ["Get the constructors standings of a season after a specific round"],
        "Options": ["-y YEAR", "-r ROUND", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "drivers": {
        "Aliases": ["drivers", "d"],
        "Description": ["Get details about drivers of a season"],
        "Options": ["-y YEAR", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "driversStandings": {
        "Aliases": ["scoreboard", "sb"],
        "Description": ["Get the drivers standings of a season after a specific round"],
        "Options": ["-y YEAR", "-r ROUND", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "next": {
        "Aliases": ["next", "n"],
        "Description": ["Get details about the next race"],
        "Options": ["--table", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT"]
    },
    "pitstops": {
        "Aliases": ["pitstops", "pit"],
        "Description": ["Get details about pitstops of a race"],
        "Options": ["-y YEAR", "-r ROUND", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "predictions": {
        "Aliases": ["predictions", "p"],
        "Description": ["See predictions or register for the next race"],
        "Options": ["@user"]
    },
    "qualifs": {
        "Aliases": ["qualifs", "q"],
        "Description": ["Get details about qualifications of a race"],
        "Options": ["-y YEAR", "-r ROUND", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "results": {
        "Aliases": ["results", "r"],
        "Description": ["Get results of a race"],
        "Options": ["-y YEAR", "-r ROUND", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    },
    "schedule": {
        "Aliases": ["schedule", "s"],
        "Description": ["Get schedule of a season"],
        "Options": ["-y YEAR", "-f FILTER1,FILTER2,...", "-col COLOR", "-bg BACKGROUND_COLOR", "-s FONT_SIZE", "-font FONT" ]
    }
}

const commandsAliases = {
    "schedule": "schedule",
    "s": "schedule",
    
    "results": "results",
    "r": "results",
    
    "drivers": "drivers",
    "d": "drivers",
    
    "constructors": "constructors",
    "c": "constructors",
    
    "scoreboard": "driversStandings",
    "sb": "driversStandings",
    
    "scoreboard_constructors": "constructorsStandings",
    "sbc": "constructorsStandings",
    
    "qualifs": "qualifs",
    "q": "qualifs",

    "pitstops": "pitstops",
    "ps": "pitstops",

    "next": "next",
    "n": "next",

    "predictions": "predictions",
    "p": "predictions",

    "help": "help"
}

function help(msg, args) {
    let cmd = args[0] || "help"

    if (cmd == "help"){
        let cmds = []
        for (const c of Object.keys(helpCommands)){
            cmds.push("`"+c+"`")
        }
        const embed = new MessageEmbed()
        .setTitle("Command '"+cmd+"': ")
        .addFields(
            { name: 'Available commands', value: cmds.join(", ")}
        )
        .setTimestamp()
        
        return utils.send(msg, {embeds: [embed]})
    }

    let alias = commandsAliases[cmd]
    if (alias === undefined)
        return utils.send(msg, {content: `${cmd} command not found`})

    let helpDict = helpCommands[alias]
    let aliases = helpDict["Aliases"]
    let desc = helpDict["Description"]
    let opts = helpDict["Options"]

    let aliasesStr = ""
    for (const a of aliases)
        aliasesStr += "`"+a+"`|"
    aliasesStr = aliasesStr.substring(0, aliasesStr.length-1)

    let descStr = ""
    for (const d of desc)
        descStr += "`"+d+"` "
    descStr = descStr.substring(0, descStr.length-1)

    let optsStr = ""
    for (const o of opts)
        optsStr += "`["+o+"]` "
    optsStr = optsStr.substring(0, optsStr.length-1)

    const embed = new MessageEmbed()
    .setTitle("Command '"+cmd+"': ")
	.addFields(
		{ name: 'Aliases', value: aliasesStr },
		{ name: 'Description', value: descStr},
		{ name: 'Options', value: optsStr},
	)
	.setTimestamp()

    return utils.send(msg, {embeds: [embed]})
}

module.exports = async function (msg, args){
    help(msg, args)
}