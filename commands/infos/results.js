var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function results(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || 'last';
    let filters = argsDict["-f"] || "";
    ergast.getRaceResults(year, round, async function(err, raceResults){
        if(err) return await utils.send(msg, {content: "Results not found"})

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
    
        ergast.getRace(year, round, function(err, race){
            let seasonYear = race["season"];
            let gp = race["raceName"];
            let circuit = race["circuit"];
            let location = circuit["location"];
            let city = location["locality"];
            let country = location["country"];
            utils.create_image(data, "FORMULA 1 - " + gp + " " + seasonYear + " - " + city + ", " +country, "RACE RESULTS")

            utils.send(msg, {files: ["out.png"]});
        })
    });
}

module.exports = async function (msg, args){
    results(msg, args)
}