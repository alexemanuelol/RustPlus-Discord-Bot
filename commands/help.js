const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command prints a help message.

**For help of a specific command type**:
    ${prefix}help theCommand
    Example:
        ${prefix}help addDevice`

module.exports = {
    name: "help",
    description: "Displays a help message.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        let commands = "";
        for (let command of discordBot.commands.keys()) {
            commands += command + "\n";
        }

        let title = "Help Information";
        let description = "Command prefix: **" + config.general.prefix + "**\n\n";
        description += "To get help for a specific command, write:\n" +
            "*" + config.general.prefix + "help command*";

        Tools.print(title, description + "\n**Available Commands:**\n" + commands);
        Tools.sendEmbed(channel, title, description, ["**Available Commands:**", commands]);

        return true;
    },
};
