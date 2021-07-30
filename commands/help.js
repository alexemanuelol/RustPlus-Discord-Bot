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

        Tools.sendEmbed(message.channel,
            "Help Information",
            "Command prefix: **" + Config.prefix + "**",
            ["**Available Commands:**", str]);

        return true;
    },
};
