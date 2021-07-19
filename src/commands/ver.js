const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const { version } = require("./../version.json");

module.exports = {
    name: "ver",
    description: "Obtain the bot version.",
    execute(message, args, bot, rustplus) {
        console.log(version);
        message.reply(version);
    },
};
