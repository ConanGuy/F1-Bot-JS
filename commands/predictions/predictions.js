var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const { set_pred_message } = require("../../utils.js");
const utils = require("../../utils.js");
const SQL = utils.SQL

async function predictions(msg, args) {
    race  = ergast.getRace("current", "next", async function(err, race){
        let race_id = `${race["season"]}${race["round"]}`;
       
        let author = msg.author
        let user_id = args[0] || author.id
        console.log(user_id)

        user_id = user_id.replace(/\D/g, "")

        let value = await SQL.get_preds([user_id, race_id]);
        if (value == undefined){
            if (user_id == author.id){pred = []
                for (let i=0; i<20; i++){
                    pred.push("NaN");
                }

                await SQL.add_user([user_id, race_id])
                let message = await author.send({content: set_pred_message(pred)})
                await SQL.update_message_id([message.id, user_id, race_id])
                return await utils.send(msg, {content: `${author} registered`})
            }
            return utils.send(msg, {content: `${args[0]} is not registered for the next race`})
        }

        pred = eval(value["pred"].replaceAll("None", "a"));
        
        utils.send(msg, {content: set_pred_message(pred)})
    })
}

module.exports = async function (msg, args){
    await predictions(msg, args)
}
