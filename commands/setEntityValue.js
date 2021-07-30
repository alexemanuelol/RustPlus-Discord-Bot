const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "setEntityValue",
    description: "Set the value of a Smart Device.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            let title = "ERROR";
            let description = "2 arguments are required. Example: !setEntityValue @name @value.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        var device = args[0];
        var value = false;

        if (args[1].toLowerCase() === "false") {
            value = false;
        }
        else {
            value = true;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;


            if (devices.hasOwnProperty(device)) {
                dev = parseInt(devices[device]);
            }
            else {
                dev = parseInt(device);
            }

            rustplus.setEntityValue(dev, value, (msg) => {
                console.log(">> Request : setEntityValue <<");

                if (msg.response.hasOwnProperty("error")) {
                    console.log(">> Response message : setEntityValue <<\n" + JSON.stringify(msg));

                    let title = "ERROR";
                    let description = "'**" + dev + "**' invalid entity ID.";
                    console.log(title + ": " + description);
                    Tools.sendEmbed(message.channel, title, description);
                }
                else {
                    let title = "Successfully Set";
                    let description = "'**" + device + "**' entity value set to: **" + value + "**";
                    console.log(title + ": " + description);
                    Tools.sendEmbed(message.channel, title, description);
                }

                return true;
            });
        });

        return true;
    },
};