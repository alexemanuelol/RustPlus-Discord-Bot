const fs = require("fs");

const Tools = require("./../tools/tools.js");

module.exports = {
    name: "setChinook47Notifications",
    description: "Set Chinook 47 Notifications enable/disable.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !setChinook47Notifications true.", channel);
            return false;
        }

        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.notifications.chinook47 = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Chinook 47 Notifications was set to **" + args[0] + "**.");

        return true;
    },
};
