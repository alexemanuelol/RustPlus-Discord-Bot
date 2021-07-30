const fs = require("fs");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "turnOn",
    description: "Turn on a Smart Switch.",
    execute(message, args, discordBot, rustplus) {
        if (args.length === 0) {
            let title = "ERROR";
            let description = "At least 1 argument is required. Example: !turnOn @name/id.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;

            for (let arg of args) {
                if (devices.hasOwnProperty(arg)) {
                    dev = parseInt(devices[arg]);
                }
                else {
                    dev = parseInt(arg);
                }

                rustplus.turnSmartSwitchOn(dev, (msg) => {
                    console.log(">> Request : turnSmartSwitchOn <<");

                    if (msg.response.hasOwnProperty("error")) {
                        console.log(">> Response message : turnSmartSwitchOn <<\n" + JSON.stringify(msg));

                        let title = "ERROR";
                        let description = "'**" + dev + "**' invalid entity ID.";
                        console.log(title + ": " + description);
                        Tools.sendEmbed(message.channel, title, description);
                    }
                    else {
                        let title = "Successfully Turned On";
                        let description = "'**" + arg + "**' was turned on.";
                        console.log(title + ": " + description);
                        Tools.sendEmbed(message.channel, title, description);
                    }
                });
            }
        });

        return true;
    },
};
