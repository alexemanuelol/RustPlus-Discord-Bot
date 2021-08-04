const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !removeDevice @name.", channel);
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
