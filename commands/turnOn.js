const Discord = require("discord.js");

const Tools = require("./../tools/tools.js");

const thumbnailName = "smart_switch.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you turn on Smart Switches.

**To turn on Smart Switch 'turret'**:
    ${prefix}turnOn turret

**To turn on Smart Switches 'turret1', 'turret2' and 'turret3'**:
    ${prefix}turnOn turret*
        or
    ${prefix}turnOn turret1 turret2 turret3

**To turn on Smart Switch with entityId 1234567**:
    ${prefix}turnOn 1234567`

module.exports = {
    name: "turnOn",
    description: "Turn on a Smart Switch.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is at least 1. */
        if (args.length === 0) {
            Tools.print("ERROR", "At least 1 arguments required. Example: " + config.general.prefix +
                "turnOn @name/id.", channel);
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

        /* Call turnSmartSwitchOn on all devices in finalDevices. */
        for (let device of finalDevices) {
            /* Send the rustplus.js request: turnSmartSwitchOn */
            rustplus.turnSmartSwitchOn(device[1], (msg) => {
                Tools.print("REQUEST", "turnSmartSwitchOn");

                /* Validate that the response message does not include any errors. */
                if (!Tools.validateResponse(msg, channel)) {
                    Tools.print("RESPONSE", "turnSmartSwitchOn\n" + JSON.stringify(msg));
                    return false;
                }

                Tools.print("Successfully Turned On", "**" + device[0] + " : " + device[1] +
                    "** was turned on.", channel, null, attachment, thumbnailName);
            });
        }

        return true;
    },
};
