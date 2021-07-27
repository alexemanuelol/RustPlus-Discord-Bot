const Main = require("./../bot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(message, args, bot, rustplus) {
        if (args.length === 0)
        {
            console.log("ERROR: Empty message.");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("ERROR")
                .setDescription("Empty message.");

            message.channel.send(error1);
            return false;
        }

        msg = message.content.replace("!sendTeamMessage ", "");
        author = message.author.username

        console.log("[" + author + "] sent a team message: " + msg);
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .setThumbnail(Main.THUMBNAIL_URL)
            .setURL(Main.GITHUB_URL)
            .setTitle("Successfully Sent")
            .setDescription("Message '**" + msg + "**' was sent.");

        message.channel.send(embed);

        return true;
    },
};
