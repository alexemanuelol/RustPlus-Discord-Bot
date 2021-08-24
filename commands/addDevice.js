const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const switchAttachment = new Discord.MessageAttachment("./images/smart_switch.png", "smart_switch.png");
const alarmAttachment = new Discord.MessageAttachment("./images/smart_alarm.png", "smart_alarm.png");
const storageAttachment = new Discord.MessageAttachment("./images/storage_monitor.png", "storage_monitor.png");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you add different devices to the devices.json located on the bot server.

**To add a Smart Switch**:
    ${prefix}addDevice nameOfSwitch entityId
    Example:
        ${prefix}addDevice switch1 1234567

**To add a Smart Alarm**:
    ${prefix}addDevice nameOfAlarm entityId
    Example:
        ${prefix}addDevice oilrig 1234567

**To add a Storage Monitor**:
    ${prefix}addDevice nameOfSM entityId
    Example:
        ${prefix}addDevice toolcupboard 1234567`

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 2. */
        if (args.length !== 2) {
            Tools.print("ERROR", "2 arguments required. Example: " + config.general.prefix
                + "addDevice @name @id.", channel);
            return false;
        }

        /* Extract device name and id from args. */
        var name = args[0];
        var id = parseInt(args[1]);

        /* Check if the ID is of integer type. */
        if (isNaN(id)) {
            Tools.print("ERROR", "Could not convert **" + args[1] + "** to integer", channel);
            return false;
        }

        /* Send the rustplus.js request: getEntityInfo */
        rustplus.getEntityInfo(id, (msg) => {
            Tools.print("REQUEST", "getEntityInfo");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getEntityInfo\n" + JSON.stringify(msg));
                return false;
            }

            /* Smart Switch */
            if (msg.response.entityInfo.type === 1) {
                let device = { id: id, type: msg.response.entityInfo.type };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Smart Switch **" + name + " : " + id + "** was added to devices.",
                    channel, null, switchAttachment, "smart_switch.png");
            }
            /* Smart Alarm */
            else if (msg.response.entityInfo.type === 2) {
                let device = { id: id, type: msg.response.entityInfo.type };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Smart Alarm **" + name + " : " + id +
                    "** was added to devices.", channel, null, alarmAttachment, "smart_alarm.png");
            }
            /* Storage Monitor */
            else if (msg.response.entityInfo.type === 3) {
                let device = { id: id, type: msg.response.entityInfo.type };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Storage Monitor **" + name + " : " + id +
                    "** was added to devices.", channel, null, storageAttachment, "storage_monitor.png");
            }
            else {
                Tools.print("ERROR", "Invalid type.");
            }
        });

        return true;
    },
};
