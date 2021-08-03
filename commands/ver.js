const Tools = require("./../tools/tools.js");
const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const { version } = require("./../version.json");

module.exports = {
    name: "ver",
    description: "Obtain the bot version.",
    execute(author, message, channel, args, discordBot, rustplus) {
        Tools.print("VERSION", version);

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(Main.THUMBNAIL_DEFAULT)
            .setThumbnail("attachment://rust_logo.png")
            .setURL(Main.GITHUB_URL + "/releases/tag/v" + version)
            .setTitle("RustPlus-Discord-Bot Version")
            .setDescription("**" + version + "**")
            .setFooter("By Alexemanuelol");

        channel.send(embed);
    },
};
