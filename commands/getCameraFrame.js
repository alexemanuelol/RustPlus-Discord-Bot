const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command gathers a jpeg frame from a camera in-game and sends it to discord.
(**NOTE**: Feature not currently supported).

**Get a frame from 'CASINO' camera at Bandit Camp**:
    ${prefix}getCameraFrame CASINO 0`

module.exports = {
    name: "getCameraFrame",
    description: "Get a jpeg image from a CCTV Camera.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 2. */
        if (args.length != 2) {
            Tools.print("ERROR", "2 arguments required. Example: " + config.general.prefix +
                "getCameraFrame @name @frame.", channel);
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
