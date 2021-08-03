const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "removeAllDevices",
    description: "Removes all devices from the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        let devices = {};

        fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
            if (err) throw err;

            Tools.print("Successfully Removed", "All devices were removed.", channel);
        });

        return true;
    },
};
