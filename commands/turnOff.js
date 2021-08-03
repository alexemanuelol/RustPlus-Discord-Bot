const Tools = require("./../tools/tools.js");

module.exports = {
    name: "turnOff",
    description: "Turn off a Smart Switch.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length === 0) {
            Tools.print("ERROR", "At least 1 arguments required. Example: !turnOff @name/id.", channel);
            return false;
        }

        let devices = Tools.readJSON("./devices.json");
        let devs = [];
        for (let arg of args) {
            if (devices.hasOwnProperty(arg)) {
                devs.push([arg, parseInt(devices[arg].id)]);
            }
            else if (arg.includes("*")) {
                for (let d in devices) {
                    if (Tools.wildcardMatch(d, arg)) {
                        devs.push([d, parseInt(devices[d].id)]);
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
            rustplus.turnSmartSwitchOff(device[1], (msg) => {
                Tools.print("REQUEST", "turnSmartSwitchOff");

                if (!Tools.validateResponse(msg, channel)) {
                    Tools.print("RESPONSE", "turnSmartSwitchOff\n" + JSON.stringify(msg));
                    return false;
                }

                Tools.print("Successfully Turned Off", "'**" + device[0] + " : " + device[1] + "**' was turned off.", channel);
            });
        }

        return true;
    },
};
