var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function constructorsStandings(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || "last";
    let filters = argsDict["-f"] || "";
    ergast.getConstructorStandingsAfterRound(year,round, async function(err, standing){
        if(err) return await utils.send(msg, {content: "Constructors standings not found"})
        try{
            let data = [];
            data.push(["Position", "Points", "Constructor", "Wins"]);
            for (let constructor of standing["standings"]){
                let pos = constructor["position"];
                let points = constructor["points"];
                let c = constructor["constructor"]["name"];
                let wins = constructor["wins"];

                let row = [pos, points, c, wins];
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

            utils.create_image(data, "FORMULA 1 - " + year.toUpperCase() + " SEASON CONSTRUCTORS STANDINGS")

            utils.send(msg, {files: ["out.png"]});
        }
        catch(error){
            utils.send(msg, {content: "Unknow error"});
        }
    });
}

module.exports = async function (msg, args){
    constructorsStandings(msg, args)
}