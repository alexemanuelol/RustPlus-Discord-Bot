const Discord = require("discord.js");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");

const help = `\
This command gathers all the public settings from the config.json file and prints it to discord.`

module.exports = {
    name: "getSettings",
    description: "Get the current config settings.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        let title = "Bot Settings";
        let description = "";

        description += "Prefix: **" + config.general.prefix + "**\n\n";
        description += "Notifications: **" + config.notifications.enabled + "**\n";
        description += "In-Game Notifications: **" + config.notifications.inGame + "**\n";
        description += "Cargo Ship Notifications: **" + config.notifications.cargoShip + "**\n";
        description += "Chinook 47 Notifications: **" + config.notifications.chinook47 + "**\n";
        description += "Crate Notifications: **" + config.notifications.crate + "**\n";
        description += "Explosion Notifications: **" + config.notifications.explosion + "**\n\n";
        description += "Alarm Notifications: **" + config.alarms.enabled + "**\n";
        description += "In-Game Alarm Notifications : **" + config.alarms.inGame + "**\n\n";
        description += "Storage Monitor Notifications: **" + config.storageMonitors.enabled + "**\n\n";
        description += "pairingNotifications: **" + config.rustplus.pairingNotifications + "**\n";
        description += "inGamePairingNotifications: **" + config.rustplus.inGamePairingNotifications + "**";

        Tools.print(title, description, channel);

        return true;
    },
};
