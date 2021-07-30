const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            console.log("ERROR: 2 arguments required. Example: !addDevice @name @id");
            Tools.sendEmbed(message.channel, "ERROR", "2 arguments required. Example: !addDevice @name @id.");
            return false;
        }

        var key = args[0];
        var value = parseInt(args[1]);

        if (isNaN(value)) {
            console.log("Could not convert '" + args[1] + "' to integer");
            Tools.sendEmbed(message.channel, "ERROR", "Could not convert '" + args[1] + "' to integer.");
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            devices[key] = value;

            /* Write to devices.json file. */
            fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                if (err) throw err;

                console.log("'**" + key + "** : " + value + "' was added to devices.");
                Tools.sendEmbed(message.channel, "Successfully Added", "'**" + key + " : " + value + "**' was added to devices.");
            });
        });

        return true;
    },
};
