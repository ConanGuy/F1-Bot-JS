var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function drivers(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let filters = argsDict["-f"] || "";
    ergast.getDrivers(year, async function(err, drivers){
        if(err) return await utils.send(msg, {content: "Drivers not found"})
        try{
            let data = [];
            data.push(["ID", "Code", "Number", "First name", "Name", "Birth", "Nationality"]);
            for (let driver of drivers["drivers"]){
                let id = driver["driverId"];
                let number = `${driver["permanentNumber"]}`;
                let code = driver["code"];
                let givenName = driver["givenName"];
                let familyName = driver["familyName"];
                let dateOfBirth = driver["dateOfBirth"];
                let nationality = driver["nationality"];

                let row = [id, code, number, givenName, familyName, dateOfBirth.replaceAll("-", "/"), nationality];
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
        
            utils.create_image(data, "FORMULA 1 - " + year.toUpperCase() + " SEASON DRIVERS LIST")

            utils.send(msg, {files: ["out.png"]});
        }
        catch(error){
            utils.send(msg, {content: "Unknow error"});
        }
    });
}

module.exports = async function (msg, args){
    drivers(msg, args)
}