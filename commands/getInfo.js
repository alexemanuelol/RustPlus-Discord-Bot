const Tools = require("./../tools/tools.js");

const help = `\
This command prints information about the server.`

module.exports = {
    name: "getInfo",
    description: "Get info about the Rust Server.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Send the rustplus.js request: getInfo */
        rustplus.getInfo((msg) => {
            Tools.print("REQUEST", "getInfo");

            /* Validate that the response message does not include any errors. */
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
                "**Wipe Time:** " + Tools.convertToStringDate(Tools.convertUnixTimestampToDate(info.wipeTime)) + "\n" +
                "**Online Players:** (" + info.players + "/" + info.maxPlayers + ")\n" +
                "**Queued Players:** " + info.queuedPlayers + "\n" +
                "**Seed:** " + info.seed + "\n" +
                "**Salt:** " + info.salt;
            Tools.print(title, description, channel);
        });

        return true;
    },
};
