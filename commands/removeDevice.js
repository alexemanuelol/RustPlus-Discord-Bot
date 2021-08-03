const fs = require("fs");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: !removeDevice @name.", channel);
            return false;
        }

        var device = args[0];

        let devices = Tools.readJSON("./devices.json");
        if (devices.hasOwnProperty(device)) {
            delete devices[device];

            fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                if (err) throw err;

                Tools.print("Successfully Removed", "'**" + device + "**' was removed from devices.", channel);
            });
        }
        else {
            Tools.print("ERROR", "'**" + device + "**' does not exist in devices.", channel);
            return false;
        }

        return true;
    },
};
