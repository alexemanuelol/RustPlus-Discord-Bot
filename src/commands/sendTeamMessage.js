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

        console.log(message.content);
        rustplus.sendTeamMessage(msg);

        return true;
	},
};
