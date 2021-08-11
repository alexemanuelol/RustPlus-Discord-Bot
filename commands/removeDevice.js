const fs = require("fs");
const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command will remove the specified device from devices.json located on the bot server.

**To remove Smart Switch 'Switch1'**:
    ${prefix}removeDevice Switch1`

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "removeDevice @name.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");

        if (devices.hasOwnProperty(args[0])) {
            delete devices[args[0]];

            /* Write the updated version of devices to devices.json. */
            fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                if (err) throw err;

                Tools.print("Successfully Removed", "**" + args[0] + "** was removed from devices.", channel);
            });
        }
        else {
            Tools.print("ERROR", "**" + args[0] + "** does not exist in devices.", channel);
            return false;
        }

        return true;
    },
};
