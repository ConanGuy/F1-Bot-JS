var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function next(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let table = argsDict["--table"] || false;
    ergast.getRace("current", "next", async function(err, race){
        if(err) return await utils.send(msg, {content: "Race not found"})
        try{
            let data = [];
            data.push(["Season", "Round", "Grand Prix", "Circuit", "City", "Country", "Date", "Time"]);

            let seasonYear = race["season"];
            let round = race["round"];
            let gp = race["raceName"];
            let circuit = race["circuit"];
            let circuitName = circuit["circuitName"];
            let location = circuit["location"];
            let city = location["locality"];
            let country = location["country"];
            let date = race["date"];
            let time = race["time"];
            time = time.substring(0, time.length-4);
            time = time.replace(':', 'h')

            let row = [seasonYear, round, gp, circuitName, city, country, date.replaceAll('-', '/'), time];
            data.push( row );
            
            let ret = {content: `${row[2]} - ${row[4]}, ${row[5]} - ${row[6]} ${row[7]}`};
            if (table){
                let str = utils.array_to_text(data);
                utils.text_to_image(str, args);
                ret["files"] = ["out.png"]
            }
            utils.send(msg, ret);   
        }
        catch(error){
            utils.send(msg, {content: "Unknow error"});
        }
    });
}

module.exports = async function (msg, args){
    next(msg, args)
}