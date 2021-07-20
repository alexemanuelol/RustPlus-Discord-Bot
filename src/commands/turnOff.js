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
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("At least 1 argument is required. Example: !turnOff @name/id.");

            message.channel.send(error1);
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;

            for (let arg of args)
            {
                if (devices.hasOwnProperty(arg))
                {
                    dev = parseInt(devices[arg]);
                }
                else
                {
                    dev = parseInt(arg);
                }

                rustplus.turnSmartSwitchOff(dev, (msg) => {
                    console.log("turnSmartSwitchOff response message: " + JSON.stringify(msg));

                    if (msg.response.hasOwnProperty("error"))
                    {
                        console.log("Some error occured, check response message above.");
                    }
                    else
                    {
                        const embed = new Discord.MessageEmbed()
                            .setColor("#ce412b")
                            .setThumbnail("https://imgur.com/znQvBMi.png")
                            .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                            .setTitle("Successfully Turned Off")
                            .setDescription("'" + arg + "' was turned off.");

                        message.channel.send(embed);
                    }
                });
            }
        });

        return true;
    },
};
