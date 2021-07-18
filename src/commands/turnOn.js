const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
	name: "turnOn",
	description: "Turn on a Smart Switch.",
	execute(message, args, bot, rustplus) {
        if (args.length === 0)
        {
            console.log("ERROR: At least 1 argument is required. Example: !turnOn @name/id");
            message.reply("ERROR: At least 1 argument is required. Example: !turnOn @name/id");
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            for (let arg of args)
            {
                if (devices.hasOwnProperty(arg))
                {
                    rustplus.turnSmartSwitchOn(parseInt(devices[arg]), (msg) => {
                        console.log("turnSmartSwitchOn response message: " + JSON.stringify(msg));
                        if (msg["response"].hasOwnProperty("error"))
                        {
                            console.log("Could not find device '" + arg + "'.")
                        }
                        else
                        {
                            message.reply("'" + arg + "' was turned on.");
                        }
                    });
                }
                else
                {
                    rustplus.turnSmartSwitchOn(parseInt(arg), (msg) => {
                        console.log("turnSmartSwitchOn response message: " + JSON.stringify(msg));
                        if (msg["response"].hasOwnProperty("error"))
                        {
                            console.log("Could not find device '" + arg + "'.")
                        }
                        else
                        {
                            message.reply("'" + arg + "' was turned on.");
                        }
                    });
                }
            }
        });

        return true;
	},
};
