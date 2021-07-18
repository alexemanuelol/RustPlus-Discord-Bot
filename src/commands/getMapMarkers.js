const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
	name: "getMapMarkers",
	description: "Get map markers, such as vending machines and cargo/heli.",
	execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            message.reply("ERROR: No arguments required.");
            return false;
        }

        var str = "";

        rustplus.getMapMarkers((msg) => {
            console.log("getMapMarkers response message:\n" + JSON.stringify(msg));

            /* TODO: Find a convenient way to display the information. */
        });

        return true;
	},
};
