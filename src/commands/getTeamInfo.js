const Discord = require("discord.js");
const RustPlus = require("rustplus.js");

module.exports = {
    name: "getTeamInfo",
    description: "Get list of team members and positions on map.",
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

        rustplus.getTeamInfo((msg) => {
            console.log("getTeamInfo response message:\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error"))
            {
                console.log("Some error occured, check response message above.");
            }
            else
            {
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail("https://imgur.com/znQvBMi.png")
                    .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
                    .setTitle("Team Information");

                for (let member of msg.response.teamInfo.members)
                {
                    embed.addField("**" + member.name + "** (" + member.steamId + ")",
                        "**IsOnline:** " + member.isOnline + "\n" +
                        "**IsAlive:** " + member.isAlive + "\n" +
                        "**SpawnTime:** " + member.spawnTime + "\n" +
                        "**DeathTime:** " + member.deathTime + "\n" +
                        "**X-cord:** " + member.x + "\n" +
                        "**Y-cord:** " + member.y);
                }

                message.channel.send(embed);
            }
        });

        return true;
    },
};
