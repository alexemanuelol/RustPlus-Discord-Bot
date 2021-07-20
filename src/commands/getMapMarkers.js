const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "getMapMarkers",
    description: "Get map markers, such as vending machines and cargo/heli.",
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

        rustplus.getMapMarkers((msg) => {
            console.log("getMapMarkers response message:\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
            }
            else
            {
                /* TODO: Find a convenient way to display the information. */
            }
        });

        return true;
    },
};
