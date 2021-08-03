const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 2) {
            Tools.print("ERROR", "2 arguments required. Example: !getCameraFrame @name @frame.", channel);
            return false;
        }

        var device = args[0];
        var frame = parseInt(args[1]);

        rustplus.getCameraFrame(device, frame, (msg => {
            Tools.print("REQUEST", "getCameraFrame");

            if (msg.response.hasOwnProperty("error")) {
                Tools.print("RESPONSE", "getCameraFrame\n" + JSON.stringify(msg));

                let description = "Feature not currently implemented. Might get a successful response if server \
                admin run the following command in F1 console: **cctvrender.enabled true**";
                Tools.print("ERROR", description, channel);
            }
            else {
                /* TBD */
            }
        }));

        return true;
    },
};
