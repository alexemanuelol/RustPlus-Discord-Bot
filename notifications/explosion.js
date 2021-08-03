const Tools = require("./../tools/tools.js");

var numberOfExplosions = 0;

module.exports = {
    name: "explosion",
    description: "Notification function for explosion detected.",
    execute(message, channel, discordBot, rustplus) {
        let config = Tools.readJSON("./config.json");

        let explosionCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === Tools.MarkerType.Explosion) {
                explosionCounter++;
            }
        }

        if (explosionCounter > numberOfExplosions) {
            let title = "NOTIFICATION";
            let description = "Explosion detected. Patrol Helicopter or Bradley APC have been taken down.";
            if (config.notifications.inGame === "true") {
                Tools.print(title, description, channel, rustplus);
            }
            else {
                Tools.print(title, description, channel);
            }
        }

        numberOfExplosions = explosionCounter;

        return true;
    },
};
