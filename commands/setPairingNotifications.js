const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the Pairing Notifications to enable/disable.

**To turn off Pairing Notifications**:
    ${prefix}setPairingNotifications false

**To turn on Pairing Notifications**:
    ${prefix}setPairingNotifications true`

module.exports = {
    name: "setPairingNotifications",
    description: "Set Pairing Notifications enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setPairingNotifications true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.rustplus.pairingNotifications = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Pairing Notifications was set to **" + args[0] + "**.", channel);

        return true;
    },
};
