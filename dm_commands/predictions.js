var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();
const Promise = require('bluebird')

const utils = require("../utils.js");
const SQL = utils.SQL

const DRIVERS = ["HAM","BOT","VER","PER","SAI","LEC","RIC","NOR","ALO","OCO","GAS","TSU","VET","STR","MAZ","MSC","LAT","RUS","RAI","GIO"]

async function show_message(message, author, pred, race_id){ 
    if (message != null){
        try {await message.delete()}
        catch(error){}
    } 

    message = await author.send({content: utils.set_pred_message(pred)})
    msg_id = message.id;
    await SQL.update_message_id([msg_id, author.id, race_id])
}

async function reset_pred(message, author, pred, race_id){ 
    pred = []
    for (let i=0; i<20; i++){
        pred.push("NaN");
    }

    if (message != null)
        await message.edit({content: utils.set_pred_message(pred)})
    else{
        message = await author.send({content: utils.set_pred_message(pred)})
        msg_id = message.id
        await SQL.update_message_id([msg_id, author.id, race_id])
    }
    await SQL.update_pred([utils.predStr(pred), author.id, race_id])
}

async function add_drivers(message, drivers, author, pred, race_id){

    for (const d of drivers){
        idx = pred.indexOf("NaN")
        pred[idx] = d.toUpperCase()
    }

    if (message != null)
        await message.edit({content: utils.set_pred_message(pred)})
    else{
        message = await author.send({content: utils.set_pred_message(pred)})
        msg_id = message.id
        await SQL.update_message_id([msg_id, author.id, race_id])
    }
    await SQL.update_pred([utils.predStr(pred), author.id, race_id])
}

async function add_driver_at(message, driver, idx, author, pred, race_id){  
    let didx = -1
    if (pred.includes(driver)){
        didx = pred.indexOf(driver)
        pred[didx] = "NaN"
    }
    pred[idx-1] = driver

    await SQL.update_pred([utils.predStr(pred), author.id, race_id])

    if (message == null){
        message = await author.send(content=utils.set_pred_message(pred))
        msg_id = message.id
        await SQL.update_message_id([msg_id, author.id, race_id])
    }
    else
        await message.edit(content=utils.set_pred_message(pred))
}

async function dm_predictions(msg) {  
    let args = msg.content.split(" ")
    race  = ergast.getRace("current", "next", async function(err, race){
        let race_id = `${race["season"]}${race["round"]}`;
       
        let author = msg.author
        let user_id = author.id

        let value = await SQL.get_preds([user_id, race_id]);
        if (value === undefined){
            return 
        }

        pred = eval(value["pred"].replaceAll("None", "a"));
        msg_id = value["message_id"];
        
        if (args.length == 0){
            utils.send(msg, {content: "No value found"})
            return
        }
        
        let message;
        try{
            message = await msg.channel.messages.fetch(msg_id);
        }
        catch(err){
            message = null
        }
        
        if (args[0].toUpperCase() == "SHOW"){
            await show_message(message, author, pred, race_id)
            return
        }
        else if (args[0].toUpperCase() == "RESET"){
            await reset_pred(message, author, pred, race_id)
            return
        }
        else if (args.filter(x => !DRIVERS.includes(x.toUpperCase())).length == 0){
            if (pred.filter(x => x=="NaN").length < args.length){
                await author.send(content="Too many drivers given")
                return
            }
            pred = await add_drivers(message, args, author, pred, race_id)
        } 
        else if (args.length == 2){ 
            try{
                let second = parseInt(args[1])
                if (!(1 <= second && second <= 20))
                    throw 'Error';
            }
            catch(error){
                await author.send(content=utils.set_pred_message(pred)+"The parameter should be an int between 1 and 20")
                return
            }

            if (!DRIVERS.includes(args[0].toUpperCase())){
                await author.send(content=utils.set_pred_message(pred)+`${args[0]} not found`)
                return
            }
            await add_driver_at(message, args[0].toUpperCase(), parseInt(args[1]), author, pred, race_id)
        }
    });
}

module.exports = async function (msg, args){
    await dm_predictions(msg)
}