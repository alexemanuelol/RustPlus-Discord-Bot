const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("ERROR")
                .setDescription("No arguments required.");

            message.channel.send(error1);
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let str = "";

            for (let key in devices)
            {
                str += "**" + key + "** : " + devices[key] + "\n";
            }

            const embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("Registered Devices")
                .addField("**Devices**", str)

            message.channel.send(embed);
        });

        return true;
    },
};
