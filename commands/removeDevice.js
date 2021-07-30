const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "removeDevice",
    description: "Removes a device from the devices.json file.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 1) {
            console.log("ERROR: 1 argument required. Example: !removeDevice @name");
            Tools.sendEmbed(message.channel, "ERROR", "1 argument required. Example: !removeDevice @name.");
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);

            if (devices.hasOwnProperty(device)) {
                delete devices[device];

                /* Write to devices.json file. */
                fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                    if (err) throw err;

                    console.log("'" + device + "' was removed from devices.");
                    Tools.sendEmbed(message.channel, "Successfully Removed", "'**" + device + "**' was removed from devices.");
                });
            }
            else {
                console.log("'**" + device + "**' does not exist in devices.json.");
                return false;
            }
        });

        return true;
    },
};
