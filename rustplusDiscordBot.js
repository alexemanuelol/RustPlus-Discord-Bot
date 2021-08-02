const Discord = require("discord.js");          /* Discord module. */
const RustPlus = require("rustplus.js");        /* RustPlus module. */
const fs = require("fs");                       /* Node file system module. */
const config = require("./config.json");        /* Configuration file. */
const Tools = require("./tools/tools.js");

exports.THUMBNAIL_URL = "https://imgur.com/znQvBMi.png";
exports.GITHUB_URL = "https://github.com/alexemanuelol/RustPlus-Discord-Bot";

/* Create an instance of a discord client. */
const discordBot = new Discord.Client();
discordBot.commands = new Discord.Collection();
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
    discordBot.commands.set(command.name, command);
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
            let config = Tools.readJSON("./config.json");

            if (config.eventNotifications === "true") {
                let channel = discordBot.channels.cache.get(config.discordBotSpamChannel);
                if (typeof (channel) === "undefined") {
                    console.log("discordBotSpamChannel is invalid in config.json");
                }
                else {
                    /* Update notifications */
                    for (const notification of notifications) {
                        notification.execute(msg, channel, discordBot, rustplus);
                    }
                }
            }
        }

        setTimeout(mapMarkerPolling, 10000);
    });
}

discordBot.on("ready", () => {
    console.log("Logged in as " + discordBot.user.tag + "!");

    /* Set the BOT activity text. */
    discordBot.user.setActivity("commands!", { type: "LISTENING" });
});

/* Called whenever a new message is sent in the guild. */
discordBot.on("message", message => {
    /* If it does not start with the command prefix or if message comes from another bot, ignore. */
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    /* Obtain additional arguments from the command. */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    /* Obtain the actual command name. */
    const command = args.shift();

    /* If the command does not exist, ignore. */
    if (!discordBot.commands.has(command)) return;

    try {
        /* Execute the command. */
        discordBot.commands.get(command).execute(message.author.username, message.content, message.channel, args, discordBot, rustplus);
    }
    catch (error) {
        console.error(error);

        Tools.sendEmbed(message.channel, "ERROR", "An error occured while trying to execute that command.");
    }
});

/* Login to the discord bot. */
discordBot.login(config.discordToken);

/* Wait until connected before sending commands. */
rustplus.on('connected', () => {
    /* RustPlus-Discord-Bot now enabled! */

    /* Go through all devices in devices.json to enable broadcast. */
    console.log("Go through devices.json and validate.");
    let devices = Tools.readJSON("./devices.json");
    for (let device in devices) {
        rustplus.getEntityInfo(parseInt(devices[device].id), (msg) => {
            if (msg.response.hasOwnProperty("error")) {
                console.log(device + " : " + parseInt(devices[device].id) + " is INVALID.")
            }
            else {
                console.log(device + " : " + parseInt(devices[device].id) + " is VALID.")
            }
        });
    }
});

rustplus.on("message", (msg) => {
    if (msg.hasOwnProperty("broadcast")) {

        if (msg.broadcast.hasOwnProperty("teamMessage")) {
            console.log("Broadcast Team Message received: " + JSON.stringify(msg));

            let message = msg.broadcast.teamMessage.message.message;
            let author = msg.broadcast.teamMessage.message.name;
            let channel = discordBot.channels.cache.get(config.discordBotSpamChannel);

            if (typeof (channel) === "undefined") {
                console.log("discordBotSpamChannel is invalid in config.json");
                return;
            }

            /* If it does not start with the command prefix, ignore. */
            if (!message.startsWith(config.prefix)) return;

            /* Obtain additional arguments from the command. */
            const args = message.slice(config.prefix.length).trim().split(/ +/);

            /* Obtain the actual command name. */
            const command = args.shift();

            /* If the command does not exist, ignore. */
            if (!discordBot.commands.has(command)) return;

            try {
                /* Execute the command. */
                discordBot.commands.get(command).execute(author, message, channel, args, discordBot, rustplus);
            }
            catch (error) {
                console.error(error);

                Tools.sendEmbed(channel, "ERROR", "An error occured while trying to execute that command.");
            }
        }
    }
});

/* Connect to the rust server */
rustplus.connect();

/* Start the map marker polling */
setTimeout(mapMarkerPolling, 10000);
