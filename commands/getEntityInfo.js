const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getEntityInfo",
    description: "Get current state of a Smart Device.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 1) {
            let title = "ERROR";
            let description = "1 argument required. Example: !getEntityInfo @name/id."
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
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
            console.log(">> Request : getEntityInfo <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getEntityInfo <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "'**" + dev + "**' invalid entity ID.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
            }
            else {
                let title = "Entity Information";
                let description = "**Name:** " + device + "\n" +
                    "**Type:** " + Tools.EntityType[msg.response.entityInfo.type] + "\n" +
                    "**Value:** " + msg.response.entityInfo.payload.value + "\n" +
                    "**Capacity:** " + msg.response.entityInfo.payload.capacity + "\n" +
                    "**HasProtection:** " + msg.response.entityInfo.payload.hasProtection + "\n" +
                    "**ProtectionExpiry:** " + msg.response.entityInfo.payload.protectionExpiry;
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
            }

            return true;
        });

        return true;
    },
};
