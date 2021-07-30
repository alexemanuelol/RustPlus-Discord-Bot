const Tools = require("../tools/tools.js");

module.exports = {
    name: "getTime",
    description: "Get the current in game time.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required."
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        rustplus.getTime((msg) => {
            console.log(">> Request : getTime <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message: getTime <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "Some error occured while sending the request to the server.";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
                let title = "Time Information";
                let description = "**Current time:** " + msg.response.time.time + "\n" +
                    "**Total daylight (minutes):** " + msg.response.time.dayLengthMinutes + "\n" +
                    "**Sunrise:** " + msg.response.time.sunrise + "\n" +
                    "**Sunset:** " + msg.response.time.sunset;
                console.log(title + ":\n" + description);
                Tools.sendEmbed(message.channel, title, description);
            }
        });

        return true;
    },
};
