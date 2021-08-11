const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "smart_switch.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you change the entity value of a Smart Switch.

**To set the entity value of Smart Switch 'light' to false**:
    ${prefix}setEntityValue light false

**To set the entity value of Smart Switch 'light' to true**:
    ${prefix}setEntityValue light true`

module.exports = {
    name: "setEntityValue",
    description: "Set the value of a Smart Device.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 2. */
        if (args.length != 2) {
            Tools.print("ERROR", "2 arguments required. Example: " + config.general.prefix +
                "setEntityValue @name @value.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");

        let value = false;
        if (args[1].toLowerCase() === "false") {
            value = false;
        }
        else {
            value = true;
        }

        let id;
        if (devices.hasOwnProperty(args[0])) {
            id = parseInt(devices[args[0]].id);
        }
        else {
            id = parseInt(args[0]);
        }

        /* Send the rustplus.js request: setEntityValue */
        rustplus.setEntityValue(id, value, (msg) => {
            Tools.print("REQUEST", "setEntityValue");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "setEntityValue\n" + JSON.stringify(msg));
                return false;
            }

            Tools.print("Successfully Set", "**" + args[0] + "** entity value set to: **" + value + "**",
                channel, null, attachment, thumbnailName);
        });

        return true;
    },
};
