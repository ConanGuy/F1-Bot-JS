var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();
const Promise = require('bluebird')

const sqlite3 = require('sqlite3')
const utils = require("../utils.js");

class SQL{

    static db = new sqlite3.Database("preds.sql");  
    
    static async get_preds(options){
        return new Promise((resolve, reject) => {
            SQL.db.get("SELECT * FROM PREDICTIONS WHERE user_id = ? AND race_id = ?", options, (err, result) => {
                if (err) {
                    reject(err)
                } 
                else {
                    resolve(result)
                }
            });
        });
    }
       
    static update_message_id(options){
        con = sqlite3.connect(FILE_PATH+"/preds.sql", isolation_level=None)
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        res = cur.execute("UPDATE PREDICTIONS SET message_id = ? WHERE user_id = ? AND race_id = ?", options).fetchall()

        con.close()

        return res
    }

    static update_pred(options){
        con = sqlite3.connect(FILE_PATH+"/preds.sql", isolation_level=None)
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        res = cur.execute("UPDATE PREDICTIONS SET pred = ? WHERE user_id = ? AND race_id = ?", options).fetchall()

        con.close()

        return res
    }
}

async function dm_predictions(msg, args) {
    let argsDict = utils.manage_arguments(args);
  
    ergast.getRace("current", "next", function(err, race){
        let race_id = race["season"]+race["round"];
       
        let author = msg.author
        let user_id = author.id
        
        let promise = SQL.get_preds([user_id, race_id]);

        promise.then((value) => {
            console.log(value);
        })
    });
}

module.exports = async function (msg, args){
    await dm_predictions(msg, args)
}
