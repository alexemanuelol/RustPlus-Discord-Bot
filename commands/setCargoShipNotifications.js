const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the Cargo Ship Notifications to enable/disable.

**To turn off Cargo Ship Notifications**:
    ${prefix}setCargoShipNotifications false

**To turn on Cargo Ship Notifications**:
    ${prefix}setCargoShipNotifications true`

module.exports = {
    name: "setCargoShipNotifications",
    description: "Set Cargo Ship Notifications enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setCargoShipNotifications true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.notifications.cargoShip = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Cargo Ship Notifications was set to **" + args[0] + "**.", channel);

        return true;
    },
};
