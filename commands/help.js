const Tools = require("./../tools/tools.js");

module.exports = {
    name: "help",
    description: "Displays a help message.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        let commands = "";
        for (let command of discordBot.commands.keys()) {
            commands += command + "\n";
        }

        let title = "Help Information";
        let description = "Command prefix: **" + config.general.prefix + "**";
        Tools.print(title, description + "\n**Available Commands:**\n" + commands);
        Tools.sendEmbed(channel, title, description, ["**Available Commands:**", commands]);

        return true;
    },
};
