const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "explosion_marker.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

var numberOfExplosions = 0;

module.exports = {
    name: "explosion",
    description: "Notification function for explosion detected.",
    execute(message, channel, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        if (config.notifications.explosion !== "true") return;

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
                Tools.print(title, description, channel, rustplus, attachment, thumbnailName);
            }
            else {
                Tools.print(title, description, channel, null, attachment, thumbnailName);
            }
        }

        numberOfExplosions = explosionCounter;

        return true;
    },
};