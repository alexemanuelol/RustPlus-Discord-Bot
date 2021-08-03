const Tools = require("./../tools/tools.js");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length < 2) {
            Tools.print("ERROR", "At least 2 arguments required. Example: !addDevice @name @id.", channel);
            return false;
        }

        var key = args[0];
        var value = parseInt(args[1]);

        if (isNaN(value)) {
            Tools.print("ERROR", "Could not convert '" + args[1] + "' to integer", channel);
            return false;
        }

        rustplus.getEntityInfo(value, (msg) => {
            Tools.print("REQUEST", "getEntityInfo");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getEntityInfo\n" + JSON.stringify(msg));
                return false;
            }

            if (msg.response.entityInfo.type === 1) { /* Switch */
                Tools.writeJSON("./devices.json", key, { id: value, type: msg.response.entityInfo.type, alarmMessage: "" });
                Tools.print("Successfully Added", "Switch '**" + key + " : " + value + "**' was added to devices.", channel);
            }
            else if (msg.response.entityInfo.type === 2) { /* Alarm */
                let alarmMessage = "";

                if (args.length === 2) {
                    alarmMessage = "Alarm '" + key + "' was triggered.";
                }
                else {
                    alarmMessage = message.replace("!addDevice " + args[0] + " " + args[1] + " ", "");
                }

                Tools.writeJSON("./devices.json", key, { id: value, type: msg.response.entityInfo.type, alarmMessage: alarmMessage });
                Tools.print("Successfully Added", "Alarm '**" + key + " : " + value + "**' was added to devices with message: '**" + alarmMessage + "**'.", channel);
            }
            else if (msg.response.entityInfo.type === 3) { /* Storage Monitor */

            }
            else {
                Tools.print("ERROR", "Invalid type.");
            }
        });

        return true;
    },
};
