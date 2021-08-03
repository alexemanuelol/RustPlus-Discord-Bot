const Tools = require("./../tools/tools.js");

var cargoActive = false;

module.exports = {
    name: "cargoShip",
    description: "Notification function for cargoShip active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        if (cargoActive === false) {
            for (let marker of message.response.mapMarkers.markers) {
                if (marker.type === Tools.MarkerType.CargoShip) {
                    cargoActive = true;
                    break;
                }
            }

            if (cargoActive) {
                Tools.print("NOTIFICATION", "Cargo Ship is active.", channel, rustplus);
            }
        }
        else {
            let cargoLeft = true;
            for (let marker of message.response.mapMarkers.markers) {
                if (marker.type === Tools.MarkerType.CargoShip) {
                    cargoLeft = false;
                    break;
                }
            }

            if (cargoLeft) {
                cargoActive = false;
                Tools.print("NOTIFICATION", "Cargo Ship just despawned.", channel, rustplus);
            }
        }

        return true;
    },
};
