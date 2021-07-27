const Main = require("./../bot.js");
const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
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
    execute(msg, bot, rustplus) {
        let config = Tools.readJSON("./config.json");

        if (config.eventNotifications === "true") {
            if (typeof (bot.channels.cache.get(config.discordNotificationChannel)) === "undefined") {
                console.log("Discord Notification Channel is invalid in config.json.");
            }
            else {
                if (cargoActive === false) {
                    for (let marker of msg.response.mapMarkers.markers) {
                        if (marker.type === MarkerType.CargoShip) {
                            cargoActive = true;
                            break;
                        }
                    }

                    if (cargoActive) {
                        console.log("Cargo Ship is active.");

                        const embed = new Discord.MessageEmbed()
                            .setColor("#ce412b")
                            .setThumbnail(Main.THUMBNAIL_URL)
                            .setURL(Main.GITHUB_URL)
                            .setTitle("NOTIFICATION")
                            .setDescription("**Cargo Ship** is active.");

                        bot.channels.cache.get(config.discordNotificationChannel).send(embed);
                    }
                }
                else {
                    let cargoLeft = true;
                    for (let marker of msg.response.mapMarkers.markers) {
                        if (marker.type === MarkerType.CargoShip) {
                            cargoLeft = false;
                            break;
                        }
                    }

                    if (cargoLeft) {
                        cargoActive = false;
                        console.log("Cargo Ship just despawned.");

                        const embed = new Discord.MessageEmbed()
                            .setColor("#ce412b")
                            .setThumbnail(Main.THUMBNAIL_URL)
                            .setURL(Main.GITHUB_URL)
                            .setTitle("NOTIFICATION")
                            .setDescription("**Cargo Ship** just despawned.");

                        bot.channels.cache.get(config.discordNotificationChannel).send(embed);
                    }
                }
            }
        }

        return true;
    },
};
