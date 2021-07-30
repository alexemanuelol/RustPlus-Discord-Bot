const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getEntityInfo",
    description: "Get current state of a Smart Device.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 1) {
            console.log("ERROR: 1 argument required. Example: !getEntityInfo @name/id");
            Tools.sendEmbed(message.channel, "ERROR", "1 argument required. Example: !getEntityInfo @name/id.");
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;

            if (devices.hasOwnProperty(device)) {
                dev = parseInt(devices[device]);
            }
            else {
                dev = parseInt(device);
            }

            rustplus.getEntityInfo(dev, (msg) => {
                console.log("Response message: >> getEntityInfo <<\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error")) {
                    console.log("Some error occured, check response message above.");
                    Tools.sendEmbed(message.channel, "ERROR", "'**" + dev + "**' invalid entity ID.");
                }
                else {
                    let deviceType = "";
                    switch (msg.response.entityInfo.type) {
                        case 1:
                            deviceType = "Switch";
                            break;
                        case 2:
                            deviceType = "Alarm";
                            break;
                        case 3:
                            deviceType = "StorageMonitor";
                            break;
                        default:
                            deviceType = "Unknown";
                    }
                    Tools.sendEmbed(message.channel, "Entity Information",
                        "**Name:** " + device + "\n" +
                        "**Type:** " + deviceType + "\n" +
                        "**Value:** " + msg.response.entityInfo.payload.value + "\n" +
                        "**Capacity:** " + msg.response.entityInfo.payload.capacity + "\n" +
                        "**HasProtection:** " + msg.response.entityInfo.payload.hasProtection + "\n" +
                        "**ProtectionExpiry:** " + msg.response.entityInfo.payload.protectionExpiry);
                }

                return true;
            });
        });

        return true;
    },
};
