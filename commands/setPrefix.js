const fs = require("fs");

const Tools = require("./../tools/tools.js");

const help = `\
This command lets you change the command prefix for the bot.

**To change the prefix to / from !**:
    !setPrefix /`

module.exports = {
    name: "setPrefix",
    description: "Set the command prefix.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix + "setPrefix !", channel);
            return false;
        }

        if (args[0].length !== 1) {
            Tools.print("ERROR", "A prefix has to be of length 1.", channel);
            return false;
        }

        config.general.prefix = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "New prefix was set: **" + args[0] + "**", channel);

        /* Set the BOT activity text. */
        discordBot.user.setActivity(args[0] + "help", { type: "LISTENING" });

        return true;
    },
};
