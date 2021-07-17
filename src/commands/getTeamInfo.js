const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
	name: "getTeamInfo",
	description: "Get list of team members and positions on map.",
	execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            message.reply("ERROR: No arguments required.");
            return false;
        }

        var str = "";

        rustplus.getTeamInfo((msg) => {
            let info = msg["response"]["teamInfo"];
            let members = info["members"];

            for (let member of members)
            {
                str += "**Name:** " + member["name"] + ", ";
                str += "**Online:** " + member["isOnline"] + ", ";
                str += "**Alive:** " + member["isAlive"] + "\n";
            }

            console.log(str);
            message.reply(str);
        });

        return true;
	},
};
