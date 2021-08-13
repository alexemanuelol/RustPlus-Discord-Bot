const { register, listen } = require('push-receiver');
const Discord = require("discord.js");

const Tools = require("./tools.js");

const switchAttachment = new Discord.MessageAttachment("./images/smart_switch.png", "smart_switch.png");
const alarmAttachment = new Discord.MessageAttachment("./images/smart_alarm.png", "smart_alarm.png");
const storageAttachment = new Discord.MessageAttachment("./images/storage_monitor.png", "storage_monitor.png");

var fcmClient;

module.exports = {
    fcmReady: false,
    fcmListener: async function (discordBot, rustplus) {
        const rustPlusConfig = Tools.readJSON("./rustplus.config.json");
        const config = Tools.readJSON("./config.json");
        const devices = Tools.readJSON("./devices.json");

        /* Make sure that fcm credentials are in config. */
        if (!rustPlusConfig.fcm_credentials) {
            Tools.print("ERROR", "FCM Credentials missing. Please run: 'npx @liamcottle/rustplus.js fcm-register' " +
                "and then place the output 'rustplus.config.json' file in the root folder of the " +
                "RustPlus-Discord-Bot.");
            discordBot.destroy();
            process.exit(1);
        }

        fcmClient = await listen(rustPlusConfig.fcm_credentials, ({ notification, persistentId }) => {
            /* Create a delay so that buffered notifications are ignored. */
            if (!this.fcmReady) return;

            /* Parse the notification body. */
            const data = notification.data;
            const body = JSON.parse(notification.data.body);

            if (data.channelId === "pairing") {
                if (config.rustplus.pairingNotifications === "true") {
                    if (body.hasOwnProperty("entityType")) {
                        let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);

                        if (typeof (channel) === "undefined") {
                            Tools.print("ERROR", "discordBotSpamChannel is invalid in config.json.");
                            return;
                        }

                        let type = Tools.EntityType[body.entityType];
                        let id = parseInt(body.entityId);

                        /* If it is a Smart Alarm, we do not need to add it to devices.json. */
                        if (body.entityType === "2") {
                            Tools.print("PAIRING", "Smart Alarm with entityId **'" + id + "'** have been paired. " +
                                "No need to add to devices.", channel, null, alarmAttachment, "smart_alarm.png");
                            if (config.rustplus.inGamePairingNotifications === "true") {
                                rustplus.sendTeamMessage("[PAIRING] Smart Alarm with entityId '" + id + "' have been paired. No need to " +
                                    "add to devices.");
                            }
                            return;
                        }

                        for (let device in devices) {
                            if (devices[device].id === id) {
                                /* Already exist in devices.json */
                                Tools.print("ATTENTION", "Device with entityId '" + id + "' already exist in " +
                                    "devices.json");
                                return;
                            }
                        }
                        let att;
                        let name;
                        if (body.entityType === "1") {
                            att = switchAttachment;
                            name = "smart_switch.png";
                        }
                        else if (body.entityType === "3") {
                            att = storageAttachment;
                            name = "storage_monitor.png";
                        }

                        Tools.print("PAIRING", "A **" + type + "** with the entityId **'" + id + "'** was paired" +
                            ", add to devices?", channel, null, att, name);
                        if (config.rustplus.inGamePairingNotifications === "true") {
                            rustplus.sendTeamMessage("[PAIRING] A " + type + " with entityId '" + id +
                                "' was paired, add to devices?");
                        }
                    }
                }
            }
            else if (data.channelId === "alarm") {
                if (config.alarms.enabled === "true") {
                    let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);
                    let title = data.title;
                    let message = data.message;

                    Tools.print("ALARM '" + title + "'", message, channel, null, alarmAttachment, "smart_alarm.png");
                    if (config.alarms.inGame === "true") {
                        rustplus.sendTeamMessage("[ALARM '" + title + "'] " + message);
                    }
                }
            }
        });
    },
};