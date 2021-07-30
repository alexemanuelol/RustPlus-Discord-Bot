const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getInfo",
    description: "Get info about the Rust Server.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        rustplus.getInfo((msg) => {
            console.log(">> Request : getInfo <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getInfo <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "Some error occured while sending the request to the server."
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
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
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
        });

        return true;
    },
};
