var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function pitstops(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || 'last';
    let filters = argsDict["-f"] || "";
    ergast.getPitStop(year, round, "0", async function(err, pitstops){
        if(err) return await utils.send(msg, {content: "Pitstops not found"})
        
        let data = [];
        data.push(["Driver", "Lap", "Stop", "Time", "Duration"]);
        for (let ps of pitstops["pitStops"]){
            let d = ps["driverId"];
            let lap = ps["lap"];
            let stop = ps["stop"];
            let time = ps["time"];
            let duration = ps["duration"];
            
            let row = [d, lap, stop, time, duration];
            let rowStr = row.join(",").toUpperCase();
            let filtersArr = filters.split(",")
            let isIn = (filters == "") ? true : false;
            for(let f of filtersArr){
                if (rowStr.includes(f.toUpperCase())){
                    isIn = true
                }
            }
            if (isIn) data.push( row );
        };
    
        ergast.getRace(year, round, function(err, race){
            let seasonYear = race["season"];
            let gp = race["raceName"];
            let circuit = race["circuit"];
            let location = circuit["location"];
            let city = location["locality"];
            let country = location["country"];
            utils.create_image(data, "FORMULA 1 - " + gp + " " + seasonYear + " - " + city + ", " +country, "PITSTOPS")

            utils.send(msg, {files: ["out.png"]});
        })
    });
}

module.exports = async function (msg, args){
    pitstops(msg, args)
}
