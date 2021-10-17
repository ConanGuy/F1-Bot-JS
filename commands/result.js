var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

const utils = require("./utils.js");

function result(msg, args) {
    let year = args[0] || 2021;
    ergast.getSeason(year, function(err, season){
        var data = [];

        for(var race of season["races"]){
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

            data.push( [seasonYear, round, gp, circuitName, city, country, date, time] );
        }

        var str = utils.array_to_text(data);
        utils.text_to_image(str);

        utils.send(msg, {content: 'test',files: ["out.png"]});
    });
}

module.exports = async function (msg, args){
    schedule(msg, args)
}