const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            let title = "ERROR";
            let description = "2 arguments are required. Example: !getCameraFrame @name @frame";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        var device = args[0];
        var frame = parseInt(args[1]);

        rustplus.getCameraFrame(device, frame, (msg => {
            console.log(">> Request : getCameraFrame <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getCameraFrame <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "Feature not currently implemented. Might get a successful response if server \
                admin run the following command in F1 console: **cctvrender.enabled true**";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
                /* TBD */
            }
        }));

        return true;
    },
};
