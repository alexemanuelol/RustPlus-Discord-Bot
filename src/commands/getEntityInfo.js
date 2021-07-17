const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
	name: "getEntityInfo",
	description: "Get current state of a Smart Device.",
	execute(message, args, bot, rustplus) {
        if (args.length != 1)
        {
            console.log("ERROR: 1 argument required. Example: !getEntityInfo @name/id");
            message.reply("ERROR: 1 argument required. Example: !getEntityInfo @name/id");
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            if (devices.hasOwnProperty(device))
            {
                rustplus.getEntityInfo(parseInt(devices[device]), (msg) => {
                    console.log("'" + device + "' entity status: **" + msg["response"]["entityInfo"]["payload"]["value"] + "**");
                    message.reply("'" + device + "' entity status: **" + msg["response"]["entityInfo"]["payload"]["value"] + "**");
                    return true;
                });
            }
            else
            {
                rustplus.getEntityInfo(parseInt(device), (msg) => {
                    console.log("'" + device + "' entity status: **" + msg["response"]["entityInfo"]["payload"]["value"] + "**");
                    message.reply("'" + device + "' entity status: **" + msg["response"]["entityInfo"]["payload"]["value"] + "**");
                    return true;
                });
            }
        });

        return true;
	},
};
