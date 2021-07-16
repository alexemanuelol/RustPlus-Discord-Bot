const Discord = require("discord.js");

module.exports = {
	name: 'ver',
	description: 'Obtain the bot version.',
	execute(message, args) {
		//message.channel.send('Pong.');
        message.reply("0.0.1")
	},
};
