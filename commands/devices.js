const Discord = require("discord.js");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");

const help = `\
This command prints all the registered devices in the devices.json located on the bot server.`

module.exports = {
    name: "devices",
    description: "Prints all the devices located in the devices.json file.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Read the devices.json file. */
        let devices = Tools.readJSON("./devices.json");

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(Main.THUMBNAIL_DEFAULT)
            .setThumbnail("attachment://rust_logo.png")
            .setURL(Main.GITHUB_URL)
            .setTitle("Registered Devices");

        let switchStr, alarmStr, storageStr;
        switchStr = alarmStr = storageStr = "";

        for (let device in devices) {
            if (devices[device].type === 1) {
                switchStr += "**-** " + device + " : " + devices[device].id + "\n";
            }
            else if (devices[device].type === 2) {
                alarmStr += "**-** " + device + " : " + devices[device].id + "\n";
            }
            else if (devices[device].type === 3) {
                storageStr += "**-** " + device + " : " + devices[device].id + "\n";
            }
        }

        if (switchStr !== "") {
            embed.addField("**Smart Switches**", switchStr);
        }
        if (alarmStr !== "") {
            embed.addField("**Smart Alarms**", alarmStr);
        }
        if (storageStr !== "") {
            embed.addField("**Storage Containers**", storageStr);
        }

        if (switchStr === "" && alarmStr === "" && storageStr === "") {
            embed.setDescription("No registered devices.");
        }

        Tools.print("Registered Devices",);
        channel.send(embed);

        return true;
    },
};
