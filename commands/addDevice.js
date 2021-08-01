const Tools = require("./../tools/tools.js");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 2) {
            let title = "ERROR";
            let description = "2 arguments required. Example: !addDevice @name @id.";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        var key = args[0];
        var value = parseInt(args[1]);

        if (isNaN(value)) {
            let title = "ERROR";
            let description = "Could not convert '" + args[1] + "' to integer";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        rustplus.getEntityInfo(value, (msg) => {
            console.log(">> Request : getEntityInfo <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getEntityInfo <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "'**" + value + "**' invalid entity ID.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
            }
            else {
                Tools.writeJSON("./devices.json", key, value);
                let title = "Successfully Added";
                let description = "'**" + key + " : " + value + "**' was added to devices.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
            }
        });

        return true;
    },
};
