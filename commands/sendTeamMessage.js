const Tools = require("../tools/tools.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(message, args, discordBot, rustplus) {
        if (args.length === 0) {
            console.log("ERROR: Empty message.");
            Tools.sendEmbed(message.channel, "ERROR", "Empty message.");
            return false;
        }

        msg = message.content.replace("!sendTeamMessage ", "");
        author = message.author.username

        console.log("[" + author + "] sent a team message: " + msg);
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        Tools.sendEmbed(message.channel, "Successfully Sent", "Message '**" + msg + "**' was sent.");
        return true;
    },
};
