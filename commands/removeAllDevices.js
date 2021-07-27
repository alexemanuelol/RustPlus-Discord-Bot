const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "removeAllDevices",
    description: "Removes all devices from the devices.json file.",
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

        let devices = {};

        fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
            if (err) throw err;

            console.log("All devices were removed.");
            const embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("Successfully Removed")
                .setDescription("All devices were removed.");

            message.channel.send(embed);
        });

        return true;
    },
};
