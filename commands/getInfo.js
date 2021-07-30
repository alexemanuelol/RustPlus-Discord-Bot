const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getInfo",
    description: "Get info about the Rust Server.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments required.");
            return false;
        }

        rustplus.getInfo((msg) => {
            console.log("Response message: >> getInfo <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error")) {
                console.log("Some error occured, check response message above.");
            }
            else {
                let info = msg.response.info;
                Tools.sendEmbed(message.channel, "Server Information",
                    "**Name:** " + info.name + "\n" +
                    "**URL:** " + info.url + "\n" +
                    "**Map:** " + info.map + "\n" +
                    "**Map Size:** " + info.mapSize + "\n" +
                    "**Wipe Time:** " + info.wipeTime + "\n" +
                    "**Online Players:** (" + info.players + "/" + info.maxPlayers + ")\n" +
                    "**Queued Players:** " + info.queuedPlayers + "\n" +
                    "**Seed:** " + info.seed + "\n" +
                    "**Salt:** " + info.salt);
            }
        });

        return true;
    },
};
