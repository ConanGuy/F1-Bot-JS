var ErgastClient = require('ergast-client');
const Seasons = require('ergast-client/lib/client/seasons');
var ergast = new ErgastClient();

function get_schedule(){
    const season = ergast.getSeason(2021, function(err, season) {
        for(race of season["races"]){
            console.log(race.raceName)
        }
    });
}

get_schedule()
