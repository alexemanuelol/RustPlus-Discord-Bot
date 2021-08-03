const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getInfo",
    description: "Get info about the Rust Server.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        rustplus.getInfo((msg) => {
            Tools.print("REQUEST", "getInfo");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getInfo\n" + JSON.stringify(msg));
                return false;
            }

            let info = msg.response.info;
            let title = "Server Information";
            let description = "**Name:** " + info.name + "\n" +
                "**URL:** " + info.url + "\n" +
                "**Map:** " + info.map + "\n" +
                "**Map Size:** " + info.mapSize + "\n" +
                "**Wipe Time:** " + info.wipeTime + "\n" +
                "**Online Players:** (" + info.players + "/" + info.maxPlayers + ")\n" +
                "**Queued Players:** " + info.queuedPlayers + "\n" +
                "**Seed:** " + info.seed + "\n" +
                "**Salt:** " + info.salt;
            Tools.print(title, description, channel);
        });

        return true;
    },
};
