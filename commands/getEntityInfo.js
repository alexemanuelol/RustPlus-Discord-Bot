const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const switchAttach = new Discord.MessageAttachment("./images/smart_switch.png", "smart_switch.png");
const alarmAttach = new Discord.MessageAttachment("./images/smart_alarm.png", "smart_alarm.png");
const storageAttach = new Discord.MessageAttachment("./images/storage_monitor.png", "storage_monitor.png");

module.exports = {
    name: "getEntityInfo",
    description: "Get current state of a Smart Device.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !getEntityInfo @name/id.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");
        let id;

        /* Translate input arg to id. */
        if (devices.hasOwnProperty(args[0])) {
            id = parseInt(devices[args[0]].id);
        }
        else {
            id = parseInt(args[0]);
        }

        /* Send the rustplus.js request: getEntityInfo */
        rustplus.getEntityInfo(id, (msg) => {
            Tools.print("REQUEST", "getEntityInfo");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getEntityInfo\n" + JSON.stringify(msg));
                return false;
            }

            let title = "Entity Information";
            let description = "**Name:** " + args[0] + "\n" +
                "**Id:** " + id + "\n" +
                "**Type:** " + Tools.EntityType[msg.response.entityInfo.type] + "\n" +
                "**Value:** " + msg.response.entityInfo.payload.value + "\n" +
                "**Capacity:** " + msg.response.entityInfo.payload.capacity + "\n" +
                "**HasProtection:** " + msg.response.entityInfo.payload.hasProtection + "\n" +
                "**ProtectionExpiry:** " + msg.response.entityInfo.payload.protectionExpiry;

            if (msg.response.entityInfo.type === 1) {
                Tools.print(title, description, channel, null, switchAttach, "smart_switch.png");
            }
            else if (msg.response.entityInfo.type === 2) {
                Tools.print(title, description, channel, null, alarmAttach, "smart_alarm.png");
            }
            else if (msg.response.entityInfo.type === 3) {
                Tools.print(title, description, channel, null, storageAttach, "storage_monitor.png");
            }
        });

        return true;
    },
};
