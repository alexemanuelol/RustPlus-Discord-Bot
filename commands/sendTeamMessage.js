const Tools = require("./../tools/tools.js");

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length === 0) {
            let title = "ERROR";
            let description = "Empty message.";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        msg = message.replace("!sendTeamMessage ", "");

        let title = "Successfully Sent";
        let description = "[" + author + "] " + "sent the message '**" + msg + "**'.";
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        console.log(description);
        Tools.sendEmbed(channel, title, description);
        return true;
    },
};
