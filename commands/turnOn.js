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

        let devices = Tools.readJSON("./devices.json");
        let devs = [];
        for (let arg of args) {
            if (devices.hasOwnProperty(arg)) {
                devs.push([arg, parseInt(devices[arg])]);
            }
            else if (arg.includes("*")) {
                for (let d in devices) {
                    if (Tools.wildcardMatch(d, arg)) {
                        devs.push([d, parseInt(devices[d])]);
                    }
                }
            }
            else {
                devs.push([arg, parseInt(arg)]);
            }
        }

        let covered = [];
        let finalDevices = [];
        for (let dev of devs) {
            if (!covered.includes(dev[0])) {
                finalDevices.push(dev);
                covered.push(dev[0]);
            }
        }

        for (let device of finalDevices) {
            rustplus.turnSmartSwitchOn(device[1], (msg) => {
                console.log(">> Request : turnSmartSwitchOn <<");

                if (msg.response.hasOwnProperty("error")) {
                    console.log(">> Response message : turnSmartSwitchOn <<\n" + JSON.stringify(msg));

                    let title = "ERROR";
                    let description = "";
                    if (msg.response.error.error === "wrong_type") {
                        description = "'**" + device[0] + " : " + device[1] + "**' invalid type, this is not a Switch.";
                    }
                    else {
                        description = "'**" + device[0] + " : " + device[1] + "**' invalid entity ID.";
                    }

                    console.log(title + ": " + description);
                    Tools.sendEmbed(message.channel, title, description);
                }
                else {
                    let title = "Successfully Turned On";
                    let description = "'**" + device[0] + " : " + device[1] + "**' was turned on.";
                    console.log(title + ": " + description);
                    Tools.sendEmbed(message.channel, title, description);
                }
            });
        }

        return true;
    },
};
