const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the Explosion Notifications to enable/disable.

**To turn off Explosion Notifications**:
    ${prefix}setExplosionNotifications false

**To turn on Explosion Notifications**:
    ${prefix}setExplosionNotifications true`

module.exports = {
    name: "setExplosionNotifications",
    description: "Set Explosion Notifications enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setExplosionNotifications true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.notifications.explosion = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Explosion Notifications was set to **" + args[0] + "**.", channel);

        return true;
    },
};
