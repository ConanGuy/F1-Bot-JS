var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function qualifs(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let round = argsDict["-r"] || 'last';
    let filters = argsDict["-f"] || "";
    ergast.getQualifyingResults(year, round, async function(err, qualifsResults){
        if(err) return await utils.send(msg, {content: "Qualifs not found"})
        
        let data = [];
        data.push(["Position", "Driver", "Constructor", "Q1", "Q2", "Q3"]);
        for (let driver of qualifsResults["driverQualifyingResults"]){
            let pos = driver["position"];
            let d = driver["driver"];
            let dname = d["givenName"]+' '+d["familyName"];
            let constructor = driver["constructor"]["name"];
            let q1 = driver["q1"] || "NaN";
            let q2 = driver["q2"] || "NaN";
            let q3 = driver["q3"] || "NaN";
            
            let row = [pos, dname, constructor, q1, q2, q3];
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
            utils.create_image(data, "FORMULA 1 - " + gp + " " + seasonYear + " - " + city + ", " +country, "QUALIFICATIONS RESULTS")

            utils.send(msg, {files: ["out.png"]});
        })
    });
}

module.exports = async function (msg, args){
    qualifs(msg, args)
}