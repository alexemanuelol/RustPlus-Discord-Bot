const fs = require("fs");

const Tools = require("./../tools/tools.js");

module.exports = {
    name: "setAlarmNotifications",
    description: "Set Alarm Notifications enable/disable.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !setAlarmNotifications true.", channel);
            return false;
        }

        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.alarms.enabled = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Alarm Notifications was set to **" + args[0] + "**.");

        return true;
    },
};
