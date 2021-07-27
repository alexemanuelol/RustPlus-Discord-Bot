const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(message, args, bot, rustplus) {
        if (args.length != 1)
        {
            console.log("ERROR: 1 argument required. Example: !removeDevice @name");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("ERROR")
                .setDescription("1 argument required. Example: !removeDevice @name.");

            message.channel.send(error1);
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            if (devices.hasOwnProperty(device))
            {
                delete devices[device];

                /* Write to devices.json file. */
                fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                    if (err) throw err;

                    console.log("'" + device + "' was removed from devices.");
                    const embed = new Discord.MessageEmbed()
                        .setColor("#ce412b")
                        .setThumbnail(Main.THUMBNAIL_URL)
                        .setURL(Main.GITHUB_URL)
                        .setTitle("Successfully Removed")
                        .setDescription("'" + device + "' was removed from devices.");

                    message.channel.send(embed);
                });
            }
            else
            {
                console.log("'**" + device + "**' does not exist in devices.json.");
                return false;
            }
        });

        return true;
    },
};
