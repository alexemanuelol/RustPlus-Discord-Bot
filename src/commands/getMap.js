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
            message.reply("ERROR: No arguments required.");
            return false;
        }

        rustplus.getMap((msg) => {
            console.log("getMap response message:\n" + JSON.stringify(msg));

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
