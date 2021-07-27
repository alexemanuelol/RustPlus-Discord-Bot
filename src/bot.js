const Discord = require("discord.js");          /* Discord module. */
const RustPlus = require("rustplus.js");        /* RustPlus module. */
const fs = require("fs");                       /* Node file system module. */
const config = require("./config.json");        /* Configuration file. */
const devices = require("./devices.json");

/* Global variables */
const THUMBNAIL_URL = "https://imgur.com/znQvBMi.png";
const GITHUB_URL = "https://github.com/alexemanuelol/RustPlus-Discord-Bot";
exports.THUMBNAIL_URL = THUMBNAIL_URL;
exports.GITHUB_URL = GITHUB_URL;

/* Create an instance of a discord client. */
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var notifications = [];

/* Create an instance of RustPlus */
var rustplus = new RustPlus(config.rustServerIp, config.rustAppPort, config.steamId, config.rustPlayerToken);

/* Extract all the command files from the commands directory. */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/* Extract all the notification files from the notifications directory. */
const notificationFiles = fs.readdirSync("./notifications").filter(file => file.endsWith(".js"));

/* Add a new item to the Collection. Key = command name, Value = the exported module. */
for (const file of commandFiles) {
    const command = require("./commands/" + file);
    bot.commands.set(command.name, command);
}

for (const file of notificationFiles) {
    const notification = require("./notifications/" + file);
    notifications.push(notification);
}

function mapMarkerPolling() {
    rustplus.getMapMarkers((msg) => {
        if (msg.response.hasOwnProperty("error")) {
            console.log("Some error occured, check response message above.");
        }
        else {
            /* Update notifications */
            for (const notification of notifications) {
                notification.execute(msg, bot, rustplus);
            }
        }

        setTimeout(mapMarkerPolling, 10000);
    });
}


bot.on("ready", () => {
    console.log("Logged in as " + bot.user.tag + "!");

    /* Set the BOT activity text. */
    bot.user.setActivity("commands!", { type: "LISTENING" });
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

    try {
        /* Execute the command. */
        bot.commands.get(command).execute(message, args, bot, rustplus);
    }
    catch (error) {
        console.error(error);

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .setThumbnail("https://imgur.com/znQvBMi.png")
            .setURL("https://github.com/alexemanuelol/RustPlus-Discord-Bot")
            .setTitle("ERROR")
            .setDescription("An error occured while trying to execute that command.");

        message.channel.send(embed);
    }
});

/* Login to the discord bot. */
bot.login(config.discordToken);

/* Wait until connected before sending commands. */
rustplus.on('connected', () => {
    /* Ready to send requests. */
    rustplus.sendTeamMessage("RustPlus-Discord-Bot now enabled!");
});

/* Connect to the rust server */
rustplus.connect();

/* Start the map marker polling */
setTimeout(mapMarkerPolling, 10000);
