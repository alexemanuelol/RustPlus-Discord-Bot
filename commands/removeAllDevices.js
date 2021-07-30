const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "removeAllDevices",
    description: "Removes all devices from the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        let devices = {};

        fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
            if (err) throw err;

            let title = "Successfullt Removed.";
            let description = "All devices were removed.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
        });

        return true;
    },
};
