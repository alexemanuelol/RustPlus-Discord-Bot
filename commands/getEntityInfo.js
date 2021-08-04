const Tools = require("./../tools/tools.js");

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
            Tools.print(title, description, channel)
        });

        return true;
    },
};
