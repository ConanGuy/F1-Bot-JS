var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("../../utils.js");

function constructors(msg, args) {
    let argsDict = utils.manage_arguments(args);
    if ("error" in argsDict){
        utils.send(msg, {content: argsDict["error"]});
        return
    }

    let year = argsDict["-y"] || "current";
    let filters = argsDict["-f"] || "";
    ergast.getConstructors(year, function(err, constructors){
        try{
            let data = [];
            data.push(["ID", "Name", "Nationality"]);
            for (let constructor of constructors["constructors"]){
                let id = constructor["constructorId"];
                let name = constructor["name"];
                let nationality = constructor["nationality"];

                let row = [id, name, nationality];
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
    constructors(msg, args)
}