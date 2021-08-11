const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you add different devices to the devices.json located on the bot server.

**To add a Smart Switches**:
    ${prefix}addDevice nameOfSwitch entityId
    Example:
        ${prefix}addDevice switch1 1234567

**To add a Smart Alarm**:
    ${prefix}addDevice nameOfAlarm entityId theAlarmMessage
    Example:
        ${prefix}addDevice oilrig 1234567 Oilrig was just triggered!

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

        /* Verify that the number of arguments is at least 2. */
        if (args.length < 2) {
            Tools.print("ERROR", "At least 2 arguments required. Example: " + config.general.prefix
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
                let device = { id: id, type: msg.response.entityInfo.type, alarmMessage: "" };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Switch **" + name + " : " + id + "** was added to devices.",
                    channel);
            }
            /* Smart Alarm */
            else if (msg.response.entityInfo.type === 2) {
                let alarmMessage = "";

                if (args.length === 2) {
                    alarmMessage = "Alarm '" + name + "' was triggered.";
                }
                else {
                    alarmMessage = message.replace(config.general.prefix + "addDevice " + args[0] + " " +
                        args[1] + " ", "");
                }

                let device = { id: id, type: msg.response.entityInfo.type, alarmMessage: alarmMessage };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Alarm **" + name + " : " + id +
                    "** was added to devices with message: **" + alarmMessage + "**.", channel);
            }
            /* Storage Monitor */
            else if (msg.response.entityInfo.type === 3) {
                let device = { id: id, type: msg.response.entityInfo.type, alarmMessage: "" };
                Tools.writeJSON("./devices.json", name, device);
                Tools.print("Successfully Added", "Storage Monitor **" + name + " : " + id +
                    "** was added to devices.", channel);
            }
            else {
                Tools.print("ERROR", "Invalid type.");
            }
        });

        return true;
    },
};
