const Main = require("./../bot.js");
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
                .setThumbnail(Main.THUMBNAIL_URL)
                .setURL(Main.GITHUB_URL)
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
                dev = parseInt(devices[device]);
            }
            else
            {
                dev = parseInt(device);
            }

            rustplus.getEntityInfo(dev, (msg) => {
                console.log("Response message: >> getEntityInfo <<\n" + JSON.stringify(msg));

                if (msg.response.hasOwnProperty("error"))
                {
                    console.log("Some error occured, check response message above.");
                    const error2 = new Discord.MessageEmbed()
                        .setColor("#ce412b")
                        .setThumbnail(Main.THUMBNAIL_URL)
                        .setURL(Main.GITHUB_URL)
                        .setTitle("ERROR")
                        .setDescription("'**" + dev + "**' invalid entity ID.");

                    message.channel.send(error2);
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
                        .setThumbnail(Main.THUMBNAIL_URL)
                        .setURL(Main.GITHUB_URL)
                        .setTitle("Entity Information")
                        .setDescription("**Name:** " + device + "\n" +
                                        "**Type:** " + deviceType + "\n" +
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
