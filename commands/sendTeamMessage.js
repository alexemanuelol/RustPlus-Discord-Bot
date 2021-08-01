const Tools = require("./../tools/tools.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(message, args, discordBot, rustplus) {
        if (args.length === 0) {
            let title = "ERROR";
            let description = "Empty message.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        msg = message.content.replace("!sendTeamMessage ", "");
        author = message.author.username

        let title = "Successfully Sent";
        let description = "[" + author + "] " + "sent the message '**" + msg + "**'.";
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        console.log(description);
        Tools.sendEmbed(message.channel, title, description);
        return true;
    },
};
