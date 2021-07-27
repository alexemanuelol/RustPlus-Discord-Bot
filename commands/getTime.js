const Main = require("./../bot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "getTime",
    description: "Get the current in game time.",
    execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("ERROR")
                .setDescription("No arguments required.");

            message.channel.send(error1);
            return false;
        }

        rustplus.getTime((msg) => {
            console.log("Response message: >> getTime <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
            }
            else
            {
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail(Main.THUMBNAIL_URL)
                    .setURL(Main.GITHUB_URL)
                    .setTitle("Time Information")
                    .setDescription("**Current time:** " + msg.response.time.time + "\n" +
                                    "**Total daylight (minutes):** " + msg.response.time.dayLengthMinutes + "\n" +
                                    "**Sunrise:** " + msg.response.time.sunrise + "\n" +
                                    "**Sunset:** " + msg.response.time.sunset);

                message.channel.send(embed);
            }
        });

        return true;
    },
};
