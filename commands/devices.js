const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments required.");
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

            Tools.sendEmbed(message.channel, "Registered Devices", "", ["**Devices**", str]);
        });

        return true;
    },
};
