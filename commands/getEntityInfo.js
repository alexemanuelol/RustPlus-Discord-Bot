const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getEntityInfo",
    description: "Get current state of a Smart Device.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !getEntityInfo @name/id.", channel);
            return false;
        }

        var device = args[0];

        let devices = Tools.readJSON("./devices.json");
        let dev;

        if (devices.hasOwnProperty(device)) {
            dev = parseInt(devices[device].id);
        }
        else {
            dev = parseInt(device);
        }

        rustplus.getEntityInfo(dev, (msg) => {
            Tools.print("REQUEST", "getEntityInfo");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getEntityInfo\n" + JSON.stringify(msg));
                return false;
            }

            let title = "Entity Information";
            let description = "**Name:** " + device + "\n" +
                "**Type:** " + Tools.EntityType[msg.response.entityInfo.type] + "\n" +
                "**Value:** " + msg.response.entityInfo.payload.value + "\n" +
                "**Capacity:** " + msg.response.entityInfo.payload.capacity + "\n" +
                "**HasProtection:** " + msg.response.entityInfo.payload.hasProtection + "\n" +
                "**ProtectionExpiry:** " + msg.response.entityInfo.payload.protectionExpiry;
            Tools.print(title, description, channel)
        });

        return true;
    },
};
