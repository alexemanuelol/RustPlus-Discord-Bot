const Tools = require("./../tools/tools.js");

const MarkerType = {
    Source: 0,
    Player: 1,
    Explosion: 2,
    VendingMachine: 3,
    CH47: 4,
    CargoShip: 5,
    Crate: 6,
    GenericRadius: 7,
    TrainTunnels: 8,
}

var numberOfExplosions = 0;

module.exports = {
    name: "explosion",
    description: "Notification function for explosion detected.",
    execute(message, channel, discordBot, rustplus) {
        let explosionCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === MarkerType.Explosion) {
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
