const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "crate.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

var numberOfCurrentCrates = 0;

module.exports = {
    name: "crate",
    description: "Notification function for crate spawn.",
    execute(message, channel, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        if (config.notifications.crate !== "true") return;

        let crateCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === Tools.MarkerType.Crate) {
                crateCounter++;
            }
        }

        if (crateCounter > numberOfCurrentCrates) {
            let title = "NOTIFICATION";
            let description = "A Crate just spawned somewhere on the map.";
            if (config.notifications.inGame === "true") {
                Tools.print(title, description, channel, rustplus, attachment, thumbnailName);
            }
            else {
                Tools.print(title, description, channel, null, attachment, thumbnailName);
            }
        }

        numberOfCurrentCrates = crateCounter;

        return true;
    },
};