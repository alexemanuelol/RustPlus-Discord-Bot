const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the Alarm Notifications to enable/disable.

**To turn off Alarm Notifications**:
    ${prefix}setAlarmNotifications false

**To turn on Alarm Notifications**:
    ${prefix}setAlarmNotifications true`

module.exports = {
    name: "setAlarmNotifications",
    description: "Set Alarm Notifications enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setAlarmNotifications true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.alarms.enabled = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Alarm Notifications was set to **" + args[0] + "**.", channel);

        return true;
    },
};
