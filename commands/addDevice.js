const Tools = require("./../tools/tools.js");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 2) {
            let title = "ERROR";
            let description = "2 arguments required. Example: !addDevice @name @id.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        var key = args[0];
        var value = parseInt(args[1]);

        if (isNaN(value)) {
            let title = "ERROR";
            let description = "Could not convert '" + args[1] + "' to integer";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        Tools.writeJSON("./devices.json", key, value);
        let title = "Successfully Added";
        let description = "'**" + key + " : " + value + "**' was added to devices.";
        console.log(title + ": " + description);
        Tools.sendEmbed(message.channel, title, description);

        return true;
    },
};
