const Tools = require("../tools/tools.js");

module.exports = {
    name: "getTime",
    description: "Get the current in game time.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments required.");
            return false;
        }

        rustplus.getTime((msg) => {
            console.log("Response message: >> getTime <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error")) {
                console.log("Some error occured, check response message above.");
            }
            else {
                Tools.sendEmbed(message.channel, "Time Information",
                    "**Current time:** " + msg.response.time.time + "\n" +
                    "**Total daylight (minutes):** " + msg.response.time.dayLengthMinutes + "\n" +
                    "**Sunrise:** " + msg.response.time.sunrise + "\n" +
                    "**Sunset:** " + msg.response.time.sunset);
            }
        });

        return true;
    },
};
