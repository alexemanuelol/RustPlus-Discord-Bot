const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "chinook47.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

var numberOfActiveChinook = 0;

module.exports = {
    name: "chinook47",
    description: "Notification function for chinook 47 active/inactive.",
    execute(message, channel, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        if (config.notifications.chinook47 !== "true") return;

        let chinookCounter = 0;

        for (let marker of message.response.mapMarkers.markers) {
            if (marker.type === Tools.MarkerType.CH47) {
                chinookCounter++;
            }
        }

        if (chinookCounter > numberOfActiveChinook) {
            let title = "NOTIFICATION";
            let description = "Chinook 47 is active. Oilrig might've been triggered or CH47 is ready to drop off a crate at a monument.";
            if (config.notifications.inGame === "true") {
                Tools.print(title, description, channel, rustplus, attachment, thumbnailName);
            }
            else {
                Tools.print(title, description, channel, null, attachment, thumbnailName);
            }
        }

        numberOfActiveChinook = chinookCounter;

        return true;
    },
};