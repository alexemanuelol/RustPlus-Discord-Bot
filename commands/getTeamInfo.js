const Discord = require("discord.js");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");

const help = `\
This command gathers information about the team and prints it to discord.`

module.exports = {
    name: "getTeamInfo",
    description: "Get list of team members and positions on map.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Send the rustplus.js request: getTeamInfo */
        rustplus.getTeamInfo((msg) => {
            Tools.print("REQUEST", "getTeamInfo");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getTeamInfo\n" + JSON.stringify(msg));
                return false;
            }

            let title = "Team Information";
            let description = "\n";

            const embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .attachFiles(Main.THUMBNAIL_DEFAULT)
                .setThumbnail("attachment://rust_logo.png")
                .setURL(Main.GITHUB_URL)
                .setTitle(title);

            /* Fill description with member information. */
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
