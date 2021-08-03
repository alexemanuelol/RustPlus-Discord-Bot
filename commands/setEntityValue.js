const Tools = require("./../tools/tools.js");

module.exports = {
    name: "setEntityValue",
    description: "Set the value of a Smart Device.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 2) {
            Tools.print("ERROR", "2 arguments required. Example: !setEntityValue @name @value.", channel);
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

        let devices = Tools.readJSON("./devices.json");
        let dev;

        if (devices.hasOwnProperty(device)) {
            dev = parseInt(devices[device].id);
        }
        else {
            dev = parseInt(device);
        }

        rustplus.setEntityValue(dev, value, (msg) => {
            Tools.print("REQUEST", "setEntityValue");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "setEntityValue\n" + JSON.stringify(msg));
                return false;
            }

            Tools.print("Successfully Set", "'**" + device + "**' entity value set to: **" + value + "**", channel);
        });

        return true;
    },
};
