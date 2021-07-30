const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "getTeamInfo",
    description: "Get list of team members and positions on map.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            console.log("ERROR: No arguments required.");
            Tools.sendEmbed(message.channel, "ERROR", "No arguments required.");
            return false;
        }

        rustplus.getTeamInfo((msg) => {
            console.log("Response message: >> getTeamInfo <<\n" + JSON.stringify(msg));

            if (msg.response.hasOwnProperty("error")) {
                console.log("Some error occured, check response message above.");
            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail(Main.THUMBNAIL_URL)
                    .setURL(Main.GITHUB_URL)
                    .setTitle("Team Information");

                for (let member of msg.response.teamInfo.members) {
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
