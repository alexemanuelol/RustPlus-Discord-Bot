const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
	name: "turnOff",
	description: "Turn off a Smart Switch.",
	execute(message, args, bot, rustplus) {
        if (args.length === 0)
        {
            console.log("ERROR: At least 1 argument is required. Example: !turnOff @name/id");
            message.reply("ERROR: At least 1 argument is required. Example: !turnOff @name/id");
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
                    rustplus.turnSmartSwitchOff(parseInt(devices[arg]), (msg) => {
                        console.log("turnSmartSwitchOff response message: " + JSON.stringify(msg));

                        if (msg.response.hasOwnProperty("error"))
                        {
                            console.log("Some error occured, check response message above.");
                        }
                        else
                        {
                            console.log("'" + arg + "' was turned off.");
                            message.reply("'" + arg + "' was turned off.");
                        }
                    });
                }
                else
                {
                    rustplus.turnSmartSwitchOff(parseInt(arg), (msg) => {
                        console.log("turnSmartSwitchOff response message: " + JSON.stringify(msg));

                        if (msg.response.hasOwnProperty("error"))
                        {
                            console.log("Some error occured, check response message above.");
                        }
                        else
                        {
                            console.log("'" + arg + "' was turned off.");
                            message.reply("'" + arg + "' was turned off.");
                        }
                    });
                }
            }
        });

        return true;
	},
};
