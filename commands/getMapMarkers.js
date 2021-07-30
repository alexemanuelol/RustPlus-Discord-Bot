const Tools = require("../tools/tools.js");

module.exports = {
    name: "getMapMarkers",
    description: "Get map markers, such as vending machines and cargo/heli.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        rustplus.getMapMarkers((msg) => {
            console.log(">> Request : getMapMarkers <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getMapMarkers <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "SOme error occured while sending the request to the server.";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
                /* TODO: Find a convenient way to display the information. */
            }
        });

        return true;
    },
};
