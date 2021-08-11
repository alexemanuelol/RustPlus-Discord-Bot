const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "smart_switch.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you turn off Smart Switches.

**To turn off Smart Switch 'turret'**:
    ${prefix}turnOff turret

**To turn off Smart Switches 'turret1', 'turret2' and 'turret3'**:
    ${prefix}turnOff turret*
        or
    ${prefix}turnOff turret1 turret2 turret3

**To turn off Smart Switch with entityId 1234567**:
    ${prefix}turnOff 1234567`

module.exports = {
    name: "turnOff",
    description: "Turn off a Smart Switch.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is at least 1. */
        if (args.length === 0) {
            Tools.print("ERROR", "At least 1 arguments required. Example: " + config.general.prefix +
                "turnOff @name/id.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");

        let identifiedDevices = [];
        /* Parse arguments and find all matching devices. */
        for (let arg of args) {
            if (devices.hasOwnProperty(arg)) {
                identifiedDevices.push([arg, parseInt(devices[arg].id)]);
            }
            else if (arg.includes("*")) {
                for (let device in devices) {
                    if (Tools.wildcardMatch(device, arg)) {
                        identifiedDevices.push([device, parseInt(devices[device].id)]);
                    }
                }
            }
            else {
                identifiedDevices.push([arg, parseInt(arg)]);
            }
        }

        let covered = [];
        let finalDevices = [];
        /* Remove duplicates from indentifiedDevices and place them in finalDevices. */
        for (let dev of identifiedDevices) {
            if (!covered.includes(dev[0])) {
                finalDevices.push(dev);
                covered.push(dev[0]);
            }
        }

        /* Call turnSmartSwitchOff on all devices in finalDevices. */
        for (let device of finalDevices) {
            /* Send the rustplus.js request: turnSmartSwitchOff */
            rustplus.turnSmartSwitchOff(device[1], (msg) => {
                Tools.print("REQUEST", "turnSmartSwitchOff");

                /* Validate that the response message does not include any errors. */
                if (!Tools.validateResponse(msg, channel)) {
                    Tools.print("RESPONSE", "turnSmartSwitchOff\n" + JSON.stringify(msg));
                    return false;
                }

                Tools.print("Successfully Turned Off", "**" + device[0] + " : " + device[1] +
                    "** was turned off.", channel, null, attachment, thumbnailName);
            });
        }

        return true;
    },
};
