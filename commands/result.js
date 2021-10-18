var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../utils.js");

function result(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || 'last';
    let filters = argsDict["-f"] || "";
    ergast.getRaceResults(year, round, function(err, raceResults){
        try{
            let data = [];
            data.push(["Position", "Driver", "Points", "Constructor", "Laps", "Status", "Grid", "Time"]);
            for (let driver of raceResults["driverResults"]){
                let pos = driver["position"];
                let d = driver["driver"];
                let dname = d["givenName"]+' '+d["familyName"];
                let points = driver["points"];
                let constructor = driver["constructor"]["name"];
                let laps = driver["laps"];
                let status = driver["status"];
                let timeDict = driver["time"];
                let time = (timeDict === null) ? "NaN" : timeDict['time']
                let grid = driver["grid"];

                let row = [pos, dname, points, constructor, laps, status, grid, time];
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
    result(msg, args)
}