const Tools = require("./../tools/tools.js");

const help = `\
This command gathers the in-game time of the server and prints it to discord.`

module.exports = {
    name: "getTime",
    description: "Get the current in game time.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Send the rustplus.js request: getTime */
        rustplus.getTime((msg) => {
            Tools.print("REQUEST", "getTime");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getTime\n" + JSON.stringify(msg));
                return false;
            }

            let title = "Time Information";
            let description = "\n**Current time:** " + Tools.convertToHoursMinutes(msg.response.time.time) + "\n" +
                "**Total daylight (minutes):** " + msg.response.time.dayLengthMinutes + "\n" +
                "**Sunrise:** " + Tools.convertToHoursMinutes(msg.response.time.sunrise) + "\n" +
                "**Sunset:** " + Tools.convertToHoursMinutes(msg.response.time.sunset);
            Tools.print(title, description, channel);
        });

        return true;
    },
};
