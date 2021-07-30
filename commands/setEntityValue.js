const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "setEntityValue",
    description: "Set the value of a Smart Device.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            console.log("ERROR: 2 arguments are required. Example: !setEntityValue @name @value");
            Tools.sendEmbed(message.channel, "ERROR", "2 arguments are required. Example: !setEntityValue @name @value.");
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
                console.log("Response message: >> setEntityValue <<\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error")) {
                    console.log("Some error occured, check response message above.");
                    Tools.sendEmbed(message.channel, "ERROR", "'**" + dev + "**' invalid entity ID.");
                }
                else {
                    Tools.sendEmbed(message.channel, "Successfully Set", "'**" + device + "**' entity value set to: **" + value + "**");
                }

                return true;
            });
        });

        return true;
    },
};
