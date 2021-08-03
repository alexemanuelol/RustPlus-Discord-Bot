const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "getTeamInfo",
    description: "Get list of team members and positions on map.",
    execute(author, message, channel, args, discordBot, rustplus) {
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        rustplus.getTeamInfo((msg) => {
            Tools.print("REQUEST", "getTeamInfo");

            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getTeamInfo\n" + JSON.stringify(msg));
                return false;
            }

            const embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .attachFiles(Main.THUMBNAIL_ATTACH)
                .setThumbnail("attachment://logo.png")
                .setURL(Main.GITHUB_URL)
                .setTitle("Team Information");

            let title = "Team Information";
            let description = "\n";

            for (let member of msg.response.teamInfo.members) {
                let field = "**" + member.name + "** (" + member.steamId + ")";
                let str = "**IsOnline:** " + member.isOnline + "\n" +
                    "**IsAlive:** " + member.isAlive + "\n" +
                    "**SpawnTime:** " + member.spawnTime + "\n" +
                    "**DeathTime:** " + member.deathTime + "\n" +
                    "**X-cord:** " + member.x + "\n" +
                    "**Y-cord:** " + member.y;

                description += field + "\n" + str + "\n";
                embed.addField(field, str);
            }

            Tools.print(title, description);
            channel.send(embed);
        });

        return true;
    },
};
