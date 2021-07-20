const Discord = require("discord.js");          /* Discord module. */
const RustPlus = require("rustplus.js");        /* RustPlus module. */
const fs = require("fs");                       /* Node file system module. */
const config = require("./config.json");        /* Configuration file. */
const devices = require("./devices.json");

/* Create an instance of a discord client. */
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

/* Create an instance of RustPlus */
var rustplus = new RustPlus(config.rustServerIp, config.rustAppPort, config.steamId, config.rustPlayerToken);

/* Extract all the command files from the commands directory. */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/* Add a new item to the Collection. Key = command name, Value = the exported module. */
for (const file of commandFiles)
{
    const command = require("./commands/" + file);
    bot.commands.set(command.name, command);
}

bot.on("ready", () => {
    console.log("Logged in as " + bot.user.tag +"!");

    /* Set the BOT activity text. */
    bot.user.setActivity("commands!", {type: "LISTENING"});
});

/* Called whenever a new message is sent in the guild. */
bot.on("message", message => {
    /* If it does not start with the command prefix or if message comes from another bot, ignore. */
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    /* Obtain additional arguments from the command. */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    /* Obtain the actual command name. */
    const command = args.shift();

    /* If the command does not exist, ignore. */
    if (!bot.commands.has(command)) return;

    try
    {
        /* Execute the command. */
        bot.commands.get(command).execute(message, args, bot, rustplus);
    }
    catch (error)
    {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

/* Login to the discord bot. */
bot.login(config.discordToken);

/* Wait until connected before sending commands. */
rustplus.on('connected', () => {
    /* Ready to send requests. */
    rustplus.sendTeamMessage("Discord-Bot now enabled!");
});

/* Connect to the rust server */
rustplus.connect();
