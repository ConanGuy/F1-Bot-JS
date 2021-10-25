var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function driversStandings(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || "last";
    let filters = argsDict["-f"] || "";
    ergast.getDriverStandingsAfterRound(year,round, async function(err, standing){
        if(err) return await utils.send(msg, {content: "Driver standings not found"})
        try{
            let data = [];
            data.push(["Position", "Points", "Name", "Constructor", "Wins"]);
            for (let driver of standing["standings"]){
                let pos = driver["position"];
                let points = driver["points"];
                let d = driver["driver"];
                let name = d["givenName"] + " " + d["familyName"]
                let constructor = driver["constructor"]["name"];
                let wins = driver["wins"];

                let row = [pos, points, name, constructor, wins];
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

            utils.create_image(data, "FORMULA 1 - " + year.toUpperCase() + " SEASON DRIVERS STANDINGS")

            utils.send(msg, {files: ["out.png"]});
        }
        catch(error){
            utils.send(msg, {content: "Unknow error"});
        }
    });
}

module.exports = async function (msg, args){
    driversStandings(msg, args)
}