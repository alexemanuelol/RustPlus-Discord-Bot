const Tools = require("../tools/tools.js");

module.exports = {
    name: "getMapMarkers",
    description: "Get map markers, such as vending machines and cargo/heli.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments required.");
            return false;
        }

        rustplus.getMapMarkers((msg) => {
            console.log("Response message: >> getMapMarkers <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error")) {
                console.log("Some error occured, check response message above.");
            }
            else {
                /* TODO: Find a convenient way to display the information. */
            }
        });

        return true;
    },
};
