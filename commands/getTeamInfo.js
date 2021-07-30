const Main = require("./../rustplusDiscordBot.js");
const Discord = require("discord.js");
const Tools = require("../tools/tools.js");

module.exports = {
    name: "getTeamInfo",
    description: "Get list of team members and positions on map.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        rustplus.getTeamInfo((msg) => {
            console.log(">> Request : getTeamInfo <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getTeamInfo <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "Some error occured while sending the request to the server.";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setColor("#ce412b")
                    .setThumbnail(Main.THUMBNAIL_URL)
                    .setURL(Main.GITHUB_URL)
                    .setTitle("Team Information");

                let title = "Team Information";
                let description = "";

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

                console.log(title + ":\n" + description);
                message.channel.send(embed);
            }
        });

        return true;
    },
};
