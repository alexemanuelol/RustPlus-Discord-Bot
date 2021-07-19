const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(message, args, bot, rustplus) {
        if (args.length === 0)
        {
            console.log("ERROR: Empty message.");
            message.reply("ERROR: Empty message.");
            return false;
        }

        msg = message.content.replace("!sendTeamMessage ", "");
        author = message.author.username

        console.log("[" + author + "] sent a team message: " + msg);
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        message.reply("Message '" + msg + "' was sent.");

        return true;
    },
};
