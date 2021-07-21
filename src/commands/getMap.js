const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

module.exports = {
    name: "getMap",
    description: "Fetch map info, which includes a jpeg image.",
    execute(message, args, bot, rustplus) {
        if (args.length != 0)
        {
            console.log("ERROR: No arguments required.");
            const error1 = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .setThumbnail("https://imgur.com/znQvBMi.png")
                .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                .setTitle("ERROR")
                .setDescription("No arguments required.");

            message.channel.send(error1);
            return false;
        }

        rustplus.getMap((msg) => {
            console.log("Response message: >> getMap <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
            }
            else
            {
                /* TODO: not working correctly, might be because of BOT permissions(?) */
                //fs.writeFileSync("123456.jpg", msg.response.map.jpgImage);
                //const image = fs.readFileSync("./123456.jpg")
                //const attachment = new Discord.MessageAttachment(image)
                //message.reply("Server map:", attachment)
            }
        });

        return true;
    },
};
