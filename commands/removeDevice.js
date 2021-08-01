const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 1) {
            let title = "ERROR";
            let description = "1 argument required. Example: !removeDevice @name."
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        var device = args[0];

        let devices = Tools.readJSON("./devices.json");
        if (devices.hasOwnProperty(device)) {
            delete devices[device];

            fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                if (err) throw err;

                let title = "Successfully Removed";
                let description = "'**" + device + "**' was removed from devices.";
                console.log(title + ": " + description);
                Tools.sendEmbed(channel, title, description);
            });
        }
        else {
            let title = "ERROR";
            let description = "'**" + device + "**' does not exist in devices.";
            console.log(title + ": " + description);
            Tools.sendEmbed(channel, title, description);
            return false;
        }

        return true;
    },
};
