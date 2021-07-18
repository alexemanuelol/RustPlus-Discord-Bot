const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
	name: "getInfo",
	description: "Get info about the Rust Server.",
	execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            message.reply("ERROR: No arguments required.");
            return false;
        }

        var str = "";

        rustplus.getInfo((msg) => {
            console.log("getInfo response message:\n" + JSON.stringify(msg));

            let info = msg.response.info;
            str += "**Server name:** " + info.name + "\n";
            str += "**URL:** <" + info.url + ">\n";
            str += "**Map:** " + info.map + "\n";
            str += "**Map Size:** " + info.mapSize + "\n";
            str += "**Wipe time:** " + info.wipeTime + "\n";
            str += "**Online players:** (" + info.players + "/" + info.maxPlayers + ")\n";
            str += "**Queued Players:** " + info.queuedPlayers + "\n";
            str += "**Seed:** " + info.seed + "\n";
            str += "**Salt:** " + info.salt;

            console.log(str);
            message.reply(str);
        });

        return true;
	},
};
