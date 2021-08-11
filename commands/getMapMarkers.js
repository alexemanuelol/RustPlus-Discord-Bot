const Tools = require("./../tools/tools.js");

const help = `\
This command gathers all the map markers of the server map.
(**NOTE**: Currently not useful for anything by itself).`

module.exports = {
    name: "getMapMarkers",
    description: "Get map markers, such as vending machines and cargo/heli.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Send the rustplus.js request: getMapMarkers */
        rustplus.getMapMarkers((msg) => {
            Tools.print("REQUEST", "getMapMarkers");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getMapMarkers\n" + JSON.stringify(msg));
                return false;
            }

            /* TODO: Find a convenient way to display the information. */
        });

        return true;
    },
};
