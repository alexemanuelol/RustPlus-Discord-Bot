const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            console.log("ERROR: 2 arguments are required. Example: !getCameraFrame @name @frame");
            Tools.sendEmbed(message.channel, "ERROR", "2 arguments required. Example: !getCameraFrame @name @frame.");
            return false;
        }

        var device = args[0];
        var frame = parseInt(args[1]);

        rustplus.getCameraFrame(device, frame, (msg => {
            console.log("Response message: >> getCameraFrame <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error")) {
                console.log("Some error occured, check response message above.");
                Tools.sendEmbed(message.channel, "ERROR", "Feature not currently implemented. Might get a successful response if server admin run the following command in F1 console:\n**cctvrender.enabled true**");
            }
            else {
                /* TBD */
            }
        }));

        return true;
    },
};
