const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "addDevice",
    description: "Add a new device to devices.json file.",
    execute(message, args, bot, rustplus) {
        if (args.length != 2)
        {
            console.log("ERROR: 2 arguments required. Example: !addDevice @name @id");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("2 arguments required. Example: !addDevice @name @id.");

            message.channel.send(error1);
            return false;
        }

        var key = args[0];
        var value = parseInt(args[1]);

        if (isNaN(value))
        {
            console.log("Could not convert '" + args[1] + "' to integer");
            const error2 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("Could not convert '" + args[1] + "' to integer.");

            message.channel.send(error2);
            return false;
        }

        /* Read the devices.json file. */
        fs.readFile("./devices.json", (err, data) => {
            if (err) throw err;
            let devices = JSON.parse(data);
            devices[key] = value;

            /* Write to devices.json file. */
            fs.writeFile("./devices.json", JSON.stringify(devices, null, 2), (err) => {
                if (err) throw err;

                console.log("'" + key + " : " + value + "' was added to devices.");
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail("https://imgur.com/znQvBMi.png")
                    .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                    .setTitle("Command successful")
                    .setDescription("'**" + key + " : " + value + "**' was added to devices.");

                message.channel.send(embed);
            });
        });

        return true;
    },
};
