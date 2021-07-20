const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "getInfo",
    description: "Get info about the Rust Server.",
    execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("No arguments required.");

            message.channel.send(error1);
            return false;
        }

        rustplus.getInfo((msg) => {
            console.log("getInfo response message:\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
            }
            else
            {
                let info = msg.response.info;
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail("https://imgur.com/znQvBMi.png")
                    .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                    .setTitle("Server Information")
                    .setDescription("**Name:** " + info.name + "\n" +
                                    "**URL:** " + info.url + "\n" +
                                    "**Map:** " + info.map + "\n" +
                                    "**Map Size:** " + info.mapSize + "\n" +
                                    "**Wipe Time:** " + info.wipeTime + "\n" +
                                    "**Online Players:** (" + info.players + "/" + info.maxPlayers + ")\n" +
                                    "**Queued Players:** " + info.queuedPlayers + "\n" +
                                    "**Seed:** " + info.seed + "\n" +
                                    "**Salt:** " + info.salt);

                message.channel.send(embed);
            }
        });

        return true;
    },
};
