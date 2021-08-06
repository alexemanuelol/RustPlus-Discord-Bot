const Tools = require("./../tools/tools.js");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that the number of arguments is at least 2. */
        if (args.length < 2) {
            Tools.print("ERROR", "At least 2 arguments required. Example: !addDevice @name @id.", channel);
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
                    alarmMessage = message.replace("!addDevice " + args[0] + " " + args[1] + " ", "");
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
