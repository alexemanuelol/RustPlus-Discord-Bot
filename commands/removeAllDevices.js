const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "removeAllDevices",
    description: "Removes all devices from the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments, required.");
            return false;
        }

        let devices = {};

        fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
            if (err) throw err;

            console.log("All devices were removed.");
            Tools.sendEmbed(message.channel, "Successfully Removed", "All devices were removed.");
        });

        return true;
    },
};
