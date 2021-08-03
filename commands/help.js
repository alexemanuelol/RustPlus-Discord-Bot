const Config = require("./../config.json");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "help",
    description: "Displays a help message.",
    execute(author, message, channel, args, discordBot, rustplus) {
        let str = "";

        for (let command of discordBot.commands.keys()) {
            str += command + "\n";
        }

        let title = "Help Information";
        let description = "Command prefix: **" + Config.prefix + "**";
        Tools.print(title, description + "\n**Available Commands:**\n" + str);
        Tools.sendEmbed(channel, title, description, ["**Available Commands:**", str]);

        return true;
    },
};
