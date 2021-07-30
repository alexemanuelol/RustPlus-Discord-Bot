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
    execute(message, discordBot, rustplus) {
        let config = Tools.readJSON("./config.json");

        if (config.eventNotifications === "true") {
            if (typeof (discordBot.channels.cache.get(config.discordNotificationChannel)) === "undefined") {
                console.log("Discord Notification Channel is invalid in config.json.");
            }
            else {
                if (cargoActive === false) {
                    for (let marker of message.response.mapMarkers.markers) {
                        if (marker.type === MarkerType.CargoShip) {
                            cargoActive = true;
                            break;
                        }
                    }

                    if (cargoActive) {
                        console.log("Cargo Ship is active.");
                        Tools.sendEmbed(discordBot.channels.cache.get(config.discordNotificationChannel), "NOTIFICATION", "**Cargo Ship** is active.");
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
                        console.log("Cargo Ship just despawned.");
                        Tools.sendEmbed(discordBot.channels.cache.get(config.discordNotificationChannel), "NOTIFICATION", "**Cargo Ship** just despawned.");
                    }
                }
            }
        }

        return true;
    },
};
