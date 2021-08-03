const Tools = require("./../tools/tools.js");
const Discord = require("discord.js");

const thumbnailName = "cargoShip.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

var cargoActive = false;

module.exports = {
    name: "cargoShip",
    description: "Notification function for cargoShip active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        let config = Tools.readJSON("./config.json");

        if (config.notifications.cargoShip !== "true") return true;

        if (cargoActive === false) {
            for (let marker of message.response.mapMarkers.markers) {
                if (marker.type === Tools.MarkerType.CargoShip) {
                    cargoActive = true;
                    break;
                }
            }

            if (cargoActive) {
                if (config.notifications.inGame === "true") {
                    Tools.print("NOTIFICATION", "Cargo Ship is active.", channel, rustplus, attachment, thumbnailName);
                }
                else {
                    Tools.print("NOTIFICATION", "Cargo Ship is active.", channel, null, attachment, thumbnailName);
                }
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
                if (config.notifications.inGame === "true") {
                    Tools.print("NOTIFICATION", "Cargo Ship just despawned.", channel, rustplus, attachment, thumbnailName);
                }
                else {
                    Tools.print("NOTIFICATION", "Cargo Ship just despawned.", channel, null, attachment, thumbnailName);
                }
            }
        }

        return true;
    },
};
