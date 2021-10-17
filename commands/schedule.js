var ErgastClient = require("ergast-client");
const { manage_arguments } = require("./utils.js");
var ergast = new ErgastClient();

const utils = require("./utils.js");

function schedule(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || new Date().getYear() + 1900;
    let filters = argsDict["-f"] || "";
    ergast.getSeason(year, function(err, season){
        try{
            let data = [];

            for(let race of season["races"]){
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

                let row = [seasonYear, round, gp, circuitName, city, country, date, time];
                let rowStr = row.join(",").toUpperCase();
                let filtersArr = filters.split(",")
                let isIn = (filters == "") ? true : false;
                for(let f of filtersArr){
                    if (rowStr.includes(f.toUpperCase())){
                        isIn = true
                    }
                }
                if (isIn) data.push( [seasonYear, round, gp, circuitName, city, country, date, time] );
            }

            let str = utils.array_to_text(data);
            utils.text_to_image(str);

            utils.send(msg, {files: ["out.png"]});   
        }
        
        catch(error){
            utils.send(msg, {content: "Impossible to find a schedule with your parameters"});
        }
    });
}

module.exports = async function (msg, args){
    schedule(msg, args)
}