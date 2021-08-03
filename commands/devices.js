const Tools = require("./../tools/tools.js");

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");
        let description = "";

        for (let key in devices) {
            description += "**" + Tools.EntityType[devices[key].type] + "** ";
            description += "named **" + key + "** with ";
            description += "id: **" + devices[key].id + "**";

            if (devices[key].type === 1) { /* Switch */
                description += ".\n";
            }
            else if (devices[key].type === 2) { /* Alarm */
                description += " and with the alarm message: **" + devices[key].alarmMessage + "**.\n";
            }
            else if (devices[key].type === 3) { /* Storage Monitor */
                description += ".\n";
            }
        }

        if (description === "") {
            description = "No registered devices.";
        }

        let title = "Registered Devices";
        Tools.print(title, description);
        Tools.sendEmbed(channel, title, "", ["**Devices**", description]);

        return true;
    },
};
