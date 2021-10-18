function isColor(strColor){
    var validateColor = require("validate-color");
    if (strColor.split(",").length == 3){
        strColor = "rgb("+strColor+")";
    }
    return validateColor.default(strColor);
}

function font_exists(font){
    var fs = require('fs');
    var path = require('path');

    let startPath = "fonts/";
    let fontfile = font+'.ttf';
    var files=fs.readdirSync(startPath);

    return files.includes(fontfile);
}

const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
  }, {});

module.exports = {
    text_to_image: function (text, args){
        var fs = require('fs');
        var text2png = require('text2png');

        let argsDict = this.manage_arguments(args);

        if ("error" in argsDict){
            utils.send(msg, {content: argsDict["error"]});
            return
        }
    
        let font = argsDict["-font"] || "consola";
        let size = argsDict["-s"] || "20";
        let color = argsDict["-col"] || "black";
        let bgColor = argsDict["-bg"] || "white";

        let optsDict = {font: size+"px "+font, localFontName: font, localFontPath: "fonts/"+font.toLowerCase()+".ttf", color: color, bgColor: bgColor, padding: 10 };

        fs.writeFileSync('out.png', text2png(text, optsDict));
    },

    array_to_text: function (data){
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

        let str = t.toString();
        str = str.substring(0, str.length-1);

        return str;
    },

    send: function (msg, kwargs, msg2=null){
        let author = msg.author;
        let date = msg.createdAt;
        let guild = msg.guild;
        

        let str = `[${guild} @${date.toUTCString()}] ${author.username} sent ${msg.content}`;
        str += `\n[${guild} @${date.toUTCString()}] Returned ${JSON.stringify(kwargs)}\n`;
        console.log(str);
        
        msg.channel.send(kwargs);
    },

    manage_arguments: function(args){
        const argsParameters = {
            "-y": {"nbParams": 1, "condition": "Number.isInteger(parseInt(params[0]))", "return": "params[0]"},
            "-f": {"nbParams": 1, "condition": "true", "return": "params[0]"},
            "-r": {"nbParams": 1, "condition": "Number.isInteger(parseInt(params[0]))", "return": "params[0]"},
            "-p": {"nbParams": 1, "condition": "Number.isInteger(parseInt(params[0]))", "return": "params[0]"},

            "--table": {"nbParams": 0, "condition": "true", "return": "true"},

            "-col": {"nbParams": 1, "condition": "isColor(params[0])", "return": "params[0]"},
            "-bg": {"nbParams": 1, "condition": "isColor(params[0])", "return": "params[0]"},
            "-font": {"nbParams": 1, "condition": "font_exists(params[0])", "return": "params[0]"},
            "-s": {"nbParams": 1, "condition": "Number.isInteger(parseInt(params[0]))", "return": "params[0]"}
        };
        
        let ret = {};
        const occ = arrToInstanceCountObj(args);
        for (var [arg, value] of Object.entries(argsParameters)){
            if (!(args.includes(arg)))
                continue;
                
            if (occ[arg] > 1){
                return({"error": `Error: ${arg} found multiple times`});
            }

            let idx = args.indexOf(arg)
            let idxParam = idx+1;
            let params = args.slice(idxParam, idxParam+value["nbParams"])
            
            if (params.length != value["nbParams"]){
                return({"error": `Error: wrong amount of parameters for ${arg}, ${value["nbParams"]} required`});
            }
            
            if (!eval(value["condition"])){
                return({"error": `Error: condition not satisfied for ${arg}`});
            }

            ret[arg] = eval(value["return"]);
        }

        return ret; 
    }
}