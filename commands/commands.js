const next = require("./next.js");

const command_prefix = ["f1.", "F1."]

commands = {
    next: next,
    n: next
};

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    // Check for the prefix in the command
    for(var prefix of command_prefix){

        // If the prefix has been found at the very beginning of the message
        if(command.indexOf(prefix) == 0){
            command = command.replace(prefix, "");
            
            // Check if the command is exists
            if(!(command in commands)){
                console.log(`'${command}' command not found`);
                break;
            }

            // Execute the command
            commands[command](msg, tokens);

            break;
        } 
    }
}