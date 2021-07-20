const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "getEntityInfo",
    description: "Get current state of a Smart Device.",
    execute(message, args, bot, rustplus) {
        if (args.length != 1)
        {
            console.log("ERROR: 1 argument required. Example: !getEntityInfo @name/id");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("1 argument required. Example: !getEntityInfo @name/id.");

            message.channel.send(error1);
            return false;
        }

        var device = args[0];

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            let dev;

            if (devices.hasOwnProperty(device))
            {
                dev = parseInt(devices[device])
            }
            else
            {
                dev = parseInt(device)
            }

            rustplus.getEntityInfo(dev, (msg) => {
                console.log("getEntityInfo response message:\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error"))
                {
                    console.log("Some error occured, check response message above.");
                }
                else
                {
                    let deviceType = "";
                    switch (msg.response.entityInfo.type)
                    {
                        case 1:
                            deviceType = "Switch";
                            break;
                        case 2:
                            deviceType = "Alarm";
                            break;
                        case 3:
                            deviceType = "StorageMonitor";
                            break;
                        default:
                            deviceType = "Unknown";
                    }
                    const embed = new Discord.MessageEmbed()
                        .setColor("#ce412b")
                        .setThumbnail("https://imgur.com/znQvBMi.png")
                        .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                        .setTitle("Entity Information")
                        .setDescription("**Type:** " + deviceType + "\n" +
                                        "**Value:** " + msg.response.entityInfo.payload.value + "\n" +
                                        "**Capacity:** " + msg.response.entityInfo.payload.capacity + "\n" +
                                        "**HasProtection:** " + msg.response.entityInfo.payload.hasProtection + "\n" +
                                        "**ProtectionExpiry:** " + msg.response.entityInfo.payload.protectionExpiry);

                    message.channel.send(embed);
                }

                return true;
            });
        });

        return true;
    },
};
