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

var cargoActive = false;

module.exports = {
    name: "cargoShip",
    description: "Notification function for cargoShip active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        if (cargoActive === false) {
            for (let marker of message.response.mapMarkers.markers) {
                if (marker.type === MarkerType.CargoShip) {
                    cargoActive = true;
                    break;
                }
            }

            if (cargoActive) {
                let title = "NOTIFICATION";
                let description = "**Cargo Ship** is active.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
                rustplus.sendTeamMessage("[NOTIFICATION] Cargo Ship is active.");
            }
        }
        else {
            let cargoLeft = true;
            for (let marker of message.response.mapMarkers.markers) {
                if (marker.type === MarkerType.CargoShip) {
                    cargoLeft = false;
                    break;
                }
            }

            if (cargoLeft) {
                cargoActive = false;
                let title = "NOTIFICATION";
                let description = "**Cargo Ship** just despawned.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
                rustplus.sendTeamMessage("[NOTIFICATION] Cargo Ship just despawned.");
            }
        }

        return true;
    },
};
