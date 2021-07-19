const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "printDevices",
    description: "Prints all the devices located in the devices.json file.",
    execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            message.reply("ERROR: No arguments required.");
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let str = "**Devices:**\n";

            for (let key in devices)
            {
                str += key + " : " + devices[key] + "\n";
            }

            console.log(str);
            message.reply(str);
        });

        return true;
    },
};
