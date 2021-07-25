const Main = require("./../bot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "setEntityValue",
    description: "Set the value of a Smart Device.",
    execute(message, args, bot, rustplus) {
        if (args.length != 2)
        {
            console.log("ERROR: 2 arguments are required. Example: !setEntityValue @name @value");
            message.reply("ERROR: 2 arguments are required. Example: !setEntityValue @name @value");
            return false;
        }

        var device = args[0];
        var value = false;

        if (args[1].toLowerCase() === "false")
        {
            value = false;
        }
        else
        {
            value = true;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;


            if (devices.hasOwnProperty(device))
            {
                dev = parseInt(devices[device]);
            }
            else
            {
                dev = parseInt(device);
            }

            rustplus.setEntityValue(dev, value, (msg) => {
                console.log("Response message: >> setEntityValue <<\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error"))
                {
                    console.log("Some error occured, check response message above.");
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#ce412b")
                        .setThumbnail(Main.THUMBNAIL_URL)
                        .setURL(Main.GITHUB_URL)
                        .setTitle("ERROR")
                        .setDescription("'**" + dev + "**' invalid entity ID.");

                    message.channel.send(error2);
                }
                else
                {
                    const embed = new Discord.MessageEmbed()
                        .setColor("#ce412b")
                        .setThumbnail(Main.THUMBNAIL_URL)
                        .setURL(Main.GITHUB_URL)
                        .setTitle("Successfully Set")
                        .setDescription("'**" + device + "**' entity value set to: **" + value + "**");

                    message.channel.send(embed);
                }

                return true;
            });
        });

        return true;
    },
};
