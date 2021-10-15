var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

function schedule(msg, args) {
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

        const config = {
            border: { 
                topBody: `─`, topJoin: `┬`, topLeft: `┌`, topRight: `┐`,
                bottomBody: `─`, bottomJoin: `┴`, bottomLeft: `└`, bottomRight: `┘`,
                bodyLeft: `│`, bodyRight: `│`, bodyJoin: `│`,
                joinBody: `─`, joinLeft: `├`, joinRight: `┤`, joinJoin: `┼`
            }
          };

        const table = require('table').table;
        let t = table(data, config);

        var fs = require('fs');
        var text2png = require('text2png');

        var str = t.toString();
        str = str.substring(0, str.length-1);

        fs.writeFileSync('out.png', text2png(str, {font: "30px Test", localFontPath: "fonts/consola.ttf", localFontName: "Test", color: "black", bgColor: "white", padding: 10 }));

        msg.channel.send({files: ["out.png"]});
    });
}

module.exports = async function (msg, args){
    schedule(msg, args)
}