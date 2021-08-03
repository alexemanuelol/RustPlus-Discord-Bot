const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getMapMarkers",
    description: "Get map markers, such as vending machines and cargo/heli.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        rustplus.getMapMarkers((msg) => {
            Tools.print("REQUEST", "getMapMarkers");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getMapMarkers\n" + JSON.stringify(msg));
                return false;
            }

            /* TODO: Find a convenient way to display the information. */
        });

        return true;
    },
};
