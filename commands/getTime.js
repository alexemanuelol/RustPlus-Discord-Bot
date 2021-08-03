const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getTime",
    description: "Get the current in game time.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        rustplus.getTime((msg) => {
            Tools.print("REQUEST", "getTime");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getTime\n" + JSON.stringify(msg));
                return false;
            }

            let title = "Time Information";
            let description = "\n**Current time:** " + msg.response.time.time + "\n" +
                "**Total daylight (minutes):** " + msg.response.time.dayLengthMinutes + "\n" +
                "**Sunrise:** " + msg.response.time.sunrise + "\n" +
                "**Sunset:** " + msg.response.time.sunset;
            Tools.print(title, description, channel);
        });

        return true;
    },
};
