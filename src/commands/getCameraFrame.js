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
            message.reply("ERROR: 2 arguments are required. Example: !getCameraFrame @name @frame");
            return false;
        }

        var device = args[0];
        var frame = parseInt(args[1]);

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            if (devices.hasOwnProperty(device))
            {
                rustplus.getCameraFrame(parseInt(devices[device]), frame,  (msg => {
                    console.log("getCameraFrame response message:\n" + JSON.stringify(msg));

                    if (msg.response.hasOwnProperty("error"))
                    {
                        console.log("Some error occured, check response message above.")
                    }
                    else
                    {
                        /* TBD */
                    }
                }));
            }
            else
            {
                rustplus.getCameraFrame(parseInt(device), frame,  (msg => {
                    console.log("getCameraFrame response message:\n" + JSON.stringify(msg));

                    if (msg.response.hasOwnProperty("error"))
                    {
                        console.log("Some error occured, check response message above.")
                    }
                    else
                    {
                        /* TBD */
                    }
                }));
            }
        });

        return true;
    },
};
