const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const config = require("./../config.json");

module.exports = {
    name: "help",
    description: "Displays a help message.",
    execute(message, args, bot, rustplus) {
        let str = "Command prefix: **" + config.prefix + "**\n\n**Available commands**:\n";

        for (let command of bot.commands.keys())
        {
            str += command + "\n";
        }

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .setThumbnail("https://imgur.com/znQvBMi.png")
            .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
            .setTitle("Help Information")
            .setDescription(str);

        message.channel.send(embed);

        return true;
    },
};
