const fs = require("fs");

const Tools = require("./../tools/tools.js");

const help = `\
This command will remove all registered devices in the devices.json located on the bot server.`

module.exports = {
    name: "removeAllDevices",
    description: "Removes all devices from the devices.json file.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Clear the devices.json from content. */
        fs.writeFile("./devices.json", JSON.stringify({}, null, 2), (err) => {
            if (err) throw err;

            Tools.print("Successfully Removed", "All devices were removed.", channel);
        });

        return true;
    },
};
