const Tools = require("./../tools/tools.js");

var numberOfExplosions = 0;

module.exports = {
    name: "explosion",
    description: "Notification function for explosion detected.",
    execute(message, channel, discordBot, rustplus) {
        let explosionCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === Tools.MarkerType.Explosion) {
                explosionCounter++;
            }
        }

        if (explosionCounter > numberOfExplosions) {
            let title = "NOTIFICATION";
            let description = "**Explosion** detected. Patrol Helicopter or Bradley APC have been taken down."
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            rustplus.sendTeamMessage("[NOTIFICATION] Explosion detected. Patrol Helicopter or Bradley APC have " +
                "been taken down.");
        }

        numberOfExplosions = explosionCounter;

        return true;
    },
};
