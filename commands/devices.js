const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let str = "";

            for (let key in devices) {
                str += "**" + key + "** : " + devices[key] + "\n";
            }

            if (str === "") {
                str = "No registered devices.";
            }

            let title = "Registered Devices";
            let description = str;
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, "", ["**Devices**", description]);
        });

        return true;
    },
};
