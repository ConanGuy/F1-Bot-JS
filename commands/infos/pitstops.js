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
    let pitstop = argsDict["-p"] || '0';
    let filters = argsDict["-f"] || "";
    ergast.getPitStop(year, round, pitstop, function(err, pitstops){
        if(err) return await utils.send(msg, {content: "Pitstops not found"})
        try{
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
        
            let str = utils.array_to_text(data);
            utils.text_to_image(str, args);

            utils.send(msg, {files: ["out.png"]});
        }
        catch(error){
            utils.send(msg, {content: "Unknow error"});
        }
    });
}

module.exports = async function (msg, args){
    pitstops(msg, args)
}
