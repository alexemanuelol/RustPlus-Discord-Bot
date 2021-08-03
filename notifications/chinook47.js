const Tools = require("./../tools/tools.js");

var numberOfActiveChinook = 0;

module.exports = {
    name: "chinook47",
    description: "Notification function for chinook 47 active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        let config = Tools.readJSON("./config.json");

        if (config.notifications.chinook47 !== "true") return true;

        let chinookCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === Tools.MarkerType.CH47) {
                chinookCounter++;
            }
        }

        if (chinookCounter > numberOfActiveChinook) {
            let title = "NOTIFICATION";
            let description = "Chinook 47 is active. Oilrig might've been triggered or CH47 is ready to drop off a crate at a monument.";
            if (config.notifications.inGame === "true") {
                Tools.print(title, description, channel, rustplus);
            }
            else {
                Tools.print(title, description, channel);
            }
        }

        numberOfActiveChinook = chinookCounter;

        return true;
    },
};
