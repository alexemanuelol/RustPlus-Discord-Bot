const Tools = require("./../tools/tools.js");

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");
        let str = "";

        for (let key in devices) {
            str += "**" + Tools.EntityType[devices[key].type] + "** ";
            str += "named **" + key + "** with ";
            str += "id: **" + devices[key].id + "**";

            if (devices[key].type === 1) { /* Switch */
                str += ".\n";
            }
            else if (devices[key].type === 2) { /* Alarm */
                str += " and with the alarm message: **" + devices[key].alarmMessage + "**.\n";
            }
            else if (devices[key].type === 3) { /* Storage Monitor */
                str += ".\n";
            }
        }

        if (str === "") {
            str = "No registered devices.";
        }

        let title = "Registered Devices";
        let description = str;
        console.log(title + ": " + description);
        Tools.sendEmbed(channel, title, "", ["**Devices**", description]);

        return true;
    },
};
