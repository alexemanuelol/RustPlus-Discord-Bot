const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is 2. */
        if (args.length != 2) {
            Tools.print("ERROR", "2 arguments required. Example: !getCameraFrame @name @frame.", channel);
            return false;
        }

        /* Extract camera name and frame from args. */
        var camera = args[0];
        var frame = parseInt(args[1]);

        /* Send the rustplus.js request: getCameraFrame */
        rustplus.getCameraFrame(camera, frame, (msg => {
            Tools.print("REQUEST", "getCameraFrame");

            /* Validate that the response message does not include any errors. */
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
