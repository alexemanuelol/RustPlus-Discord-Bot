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

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;

            if (devices.hasOwnProperty(device))
            {
                dev = parseInt(devices[device]);
            }
            else
            {
                dev = parseInt(device);
            }

            rustplus.getCameraFrame(parseInt(devices[device]), frame,  (msg => {
                console.log("Response message: >> getCameraFrame <<\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error"))
                {
                    console.log("Some error occured, check response message above.");
                }
                else
                {
                    /* TBD */
                }
            }));
        });

        return true;
    },
};
