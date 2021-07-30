const Config = require("./../config.json");
const Tools = require("./../tools/tools.js");

module.exports = {
    name: "help",
    description: "Displays a help message.",
    execute(message, args, discordBot, rustplus) {
        let str = "";

        for (let command of discordBot.commands.keys()) {
            str += command + "\n";
        }

        let title = "Help Information";
        let description = "Command prefix: **" + Config.prefix + "**";
        console.log(title + ":\n" + description + "\n**Available Commands:**\n" + str);
        Tools.sendEmbed(message.channel, title, description, ["**Available Commands:**", str]);

        return true;
    },
};
