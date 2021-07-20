const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const { version } = require("./../version.json");

module.exports = {
    name: "ver",
    description: "Obtain the bot version.",
    execute(message, args, bot, rustplus) {
        console.log(version);

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .setThumbnail("https://imgur.com/znQvBMi.png")
            .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot/releases/tag/v" + version)
            .setTitle("RustPlus-Discord-Bot Version")
            .setDescription(version)
            .setFooter("By Alexemanuelol");

        message.channel.send(embed);

    },
};
