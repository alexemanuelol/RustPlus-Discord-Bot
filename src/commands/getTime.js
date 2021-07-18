const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
	name: "getTime",
	description: "Get the current in game time.",
	execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            message.reply("ERROR: No arguments required.");
            return false;
        }

        var str = "";

        rustplus.getTime((msg) => {
            console.log("getTime response message:\n" + JSON.stringify(msg));

            let time = msg["response"]["time"];
            str += "**Current time:** " + time["time"] + "\n";
            str += "**Total daylight (minutes):** " + time["dayLengthMinutes"] + "\n";
            str += "**Sunrise:** " + time["sunrise"] + "\n";
            str += "**Sunset:** " + time["sunset"];

            console.log(str);
            message.reply(str);
        });

        return true;
	},
};
