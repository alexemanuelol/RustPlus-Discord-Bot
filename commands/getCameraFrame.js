const Main = require("./../bot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    execute(message, args, bot, rustplus) {
        if (args.length != 2)
        {
            console.log("ERROR: 2 arguments are required. Example: !getCameraFrame @name @frame");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
                .setTitle("ERROR")
                .setDescription("2 arguments required. Example: !getCameraFrame @name @frame.");

            message.channel.send(error1);
            return false;
        }

        var device = args[0];
        var frame = parseInt(args[1]);

        rustplus.getCameraFrame(device, frame, (msg => {
            console.log("Response message: >> getCameraFrame <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
                const error2 = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail(Main.THUMBNAIL_URL)
                    .setURL(Main.GITHUB_URL)
                    .setTitle("ERROR")
                    .setDescription("Feature not currently implemented. Might get a successful response if " +
                        "server admin run the following command in F1 console:\n" +
                        "**cctvrender.enabled true**");

                message.channel.send(error2);
            }
            else
            {
                /* TBD */
            }
        }));

        return true;
    },
};
