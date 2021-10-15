var ErgastClient = require("ergast-client");
var ergast = new ErgastClient();

function schedule(msg, args) {
    let year = args[0] || 2021;
    ergast.getSeason(year, function(err, season){
        var data = [];
        var Table = require('easy-table')

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

            data.push(
                {
                    seasonYear: seasonYear,
                    round: round,
                    gp: gp,
                    circuitName: circuitName,
                    city: city,
                    country: country,
                    date: date,
                    time: time,
                }
            );
        }

        var t = new Table

        data.forEach(function(product) {
            t.cell('Season', product.seasonYear)
            t.cell('Round', product.round)
            t.cell('Grand Prix', product.gp)
            t.cell('Circuit', product.circuitName)
            t.cell('City', product.city)
            t.cell('Country', product.country)
            t.cell('Date', product.date)
            t.cell('Time', product.time)
            t.newRow()
          })

        var fs = require('fs');
        var text2png = require('text2png');

        fs.writeFileSync('out.png', text2png(t.toString(), {font: "30px Test", localFontPath: "fonts/consola.ttf", localFontName: "Test", color: "black", bgColor: "white" }));

        msg.channel.send({files: ["out.png"]});
    });
}

module.exports = async function (msg, args){
    schedule(msg, args)
}