const { TextChannel } = require("discord.js");
const utils = require("../../utils.js");
const SQL = utils.SQL

async function command(msg, args) {
    if (args.length < 1) return await utils.send(msg, {content: "Please specify a channel"})

    let channel_id = args[0].replace(/\D/g, '')
    try{
        if (channel_id == "") throw "error"
        var channel = await msg.guild.channels.fetch(channel_id)
    }
    catch (e){
        return await utils.send(msg, {content: "Specified channel not found"})
    }

    if (channel.type != "GUILD_TEXT") return await utils.send(msg, {content: `The type of the specified channel should be \`GUILD_TEXT\`, \`${channel.type}\` founded`})

    await SQL.run("UPDATE PREDS_CHANNEL SET channel_id = ? WHERE guild_id = ?", [channel_id, msg.guild.id])
    return await utils.send(msg, {content: "Channel for predictions set to "+ channel.toString()})
}

module.exports = async function (msg, args){
    await command(msg, args)
}
