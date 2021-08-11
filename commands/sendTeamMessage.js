const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command sends a team message in-game.

**To send a team message In-Game**:
    ${prefix}sendTeamMessage theMessage
    Example:
        ${prefix}sendTeamMessage Hello there!`

module.exports = {
    name: "sendTeamMessage",
    description: "Sends a message to the team in-game.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is not 0, i.e. the message is empty. */
        if (args.length === 0) {
            Tools.print("ERROR", "Empty message.", channel);
            return false;
        }

        msg = message.replace(config.general.prefix + "sendTeamMessage ", "");

        let title = "Successfully Sent";
        let description = "[" + author + "] sent the message: **" + msg + "**.";
        rustplus.sendTeamMessage("[" + author + "] " + msg);
        Tools.print(title, description, channel);
        return true;
    },
};
