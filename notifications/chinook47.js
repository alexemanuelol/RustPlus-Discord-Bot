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

var numberOfActiveChinook = 0;

module.exports = {
    name: "chinook47",
    description: "Notification function for chinook 47 active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        let config = Tools.readJSON("./config.json");

        let chinookCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === MarkerType.CH47) {
                chinookCounter++;
            }
        }

        if (chinookCounter > numberOfActiveChinook) {
            let title = "NOTIFICATION";
            let description = "**Chinook 47** is active. Oilrig might've been triggered or CH47 is ready " +
                "to drop off a crate at a monument.";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description + " @" + config.discordBotTag);
            rustplus.sendTeamMessage("[NOTIFICATION] Chinook 47 is active. Oilrig might've been " +
                "triggered or CH47 is ready to drop off a crate at a monument.");
        }

        numberOfActiveChinook = chinookCounter;

        return true;
    },
};
