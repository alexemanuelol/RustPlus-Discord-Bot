const Discord = require("discord.js");
const RustPlus = require("rustplus.js");
const fs = require("fs");

const Tools = require("./tools/tools.js");

exports.THUMBNAIL_DEFAULT = new Discord.MessageAttachment("./images/rust_logo.png", "rust_logo.png");
exports.GITHUB_URL = "https://github.com/alexemanuelol/RustPlus-Discord-Bot";
const alarmAttachment = new Discord.MessageAttachment("./images/smart_alarm.png", "smart_alarm.png");
const storageAttachment = new Discord.MessageAttachment("./images/storage_monitor.png", "storage_monitor.png");

var connected = false;

function mapMarkerPolling() {
    if (!connected) {
        /* The connection must be closed. Continue polling till connected again. */
        setTimeout(mapMarkerPolling, 10000);
        return;
    }

    /* Send the rustplus.js request: getMapMarkers */
    rustplus.getMapMarkers((msg) => {
        Tools.print("mapMarkerPolling", "Poll");

        /* Validate that the response message does not include any errors. */
        if (!Tools.validateResponse(msg, null)) {
            Tools.print("RESPONSE", "getEntityInfo\n" + JSON.stringify(msg));
            setTimeout(mapMarkerPolling, 10000);
            return false;
        }

        /* Read the config.json file. */
        config = Tools.readJSON("./config.json");

        if (config.notifications.enabled === "true") {
            let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);
            if (typeof (channel) === "undefined") {
                Tools.print("ERROR", "botSpamChannel is invalid in config.json.");
            }
            else {
                /* Update notifications */
                for (const notification of notifications) {
                    notification.execute(msg, channel, discordBot, rustplus);
                }
            }
        }

    });

    setTimeout(mapMarkerPolling, 10000);
}

function reconnectRustplus() {
    Tools.print("RECONNECTING", "Reconnecting Attempt " + (reconnectAttempts + 1) + "...");
    reconnectAttempts += 1;
    reconnection = true;
    rustplus.disconnect();
    rustplus.connect();
}

function destroyBot() {
    rustplus.disconnect();
    discordBot.destroy();
    process.exit(1);
}

function parseCommand(author, message, channel, ingameCall = false) {
    /* The connection must be closed. Do nothing. */
    if (!connected) {
        return;
    }

    /* Read the config.json file. */
    config = Tools.readJSON("./config.json");

    /* If it does not start with the command prefix or if message comes from another bot, ignore. */
    if (!message.startsWith(config.general.prefix)) return;

    /* Obtain additional arguments from the command. */
    const args = message.slice(config.general.prefix.length).trim().split(/ +/);

    /* Obtain the actual command name. */
    const command = args.shift();

    /* If the command does not exist, ignore. */
    if (!discordBot.commands.has(command)) return;

    if (ingameCall) {
        channel.send("**" + author + "** just called command from in-game: **" + message + "**");
    }

    try {
        /* Execute the command. */
        discordBot.commands.get(command).execute(author, message, channel, args, discordBot, rustplus);
    }
    catch (error) {
        Tools.print("ERROR", error, channel);
    }
}

/* Read the config.json file. */
var config = Tools.readJSON("./config.json");

/*
 *  DISCORD
 */

/* Create an instance of a discord client. */
const discordBot = new Discord.Client();
discordBot.commands = new Discord.Collection();
var notifications = [];

/* Extract all the command files from the commands directory. */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
/* Add a new item to the Collection. Key = command name, Value = the exported module. */
for (const file of commandFiles) {
    const command = require("./commands/" + file);
    discordBot.commands.set(command.name, command);
}

/* Extract all the notification files from the notifications directory. */
const notificationFiles = fs.readdirSync("./notifications").filter(file => file.endsWith(".js"));
/* Add the file to notifications list. */
for (const file of notificationFiles) {
    const notification = require("./notifications/" + file);
    notifications.push(notification);
}

discordBot.on("ready", () => {
    Tools.print("DISCORD", "Logged in as " + discordBot.user.tag + "!");

    /* Read the config.json file. */
    config = Tools.readJSON("./config.json");

    /* Set the BOT activity text. */
    discordBot.user.setActivity(config.general.prefix + "help", { type: "LISTENING" });
});

/* Called whenever a new message is sent in the guild. */
discordBot.on("message", message => {
    /* If messages comes from another bot, ignore */
    if (message.author.bot) return;

    parseCommand(message.author.username, message.content, message.channel);
});

/* Login to the discord bot. */
discordBot.login(config.discord.token);


/*
 *  RUSTPLUS
 */

/* Create an instance of RustPlus */
var rustplus = new RustPlus(config.rust.serverIp, config.rust.appPort, config.general.steamId,
    config.rust.playerToken);

var reconnectAttempts = 0;
var reconnection = false;

/* Wait until connected before sending commands. */
rustplus.on('connected', () => {
    /* RustPlus-Discord-Bot now enabled! */
    connected = true;
    reconnectAttempts = 0;

    if (reconnection) {
        reconnection = false;
        let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);

        if (typeof (channel) === "undefined") {
            Tools.print("ERROR", "discordBotSpamChannel is invalid in config.json.");
            return;
        }

        Tools.print("Reconnection Successful", "Reconnection to the rust server was successful!", channel);
    }
    else {
        /* Go through all devices in devices.json to enable broadcast. */
        Tools.print("DEVICES", "Go through devices.json and validate.");
        let devices = Tools.readJSON("./devices.json");
        for (let device in devices) {
            rustplus.getEntityInfo(parseInt(devices[device].id), (msg) => {
                if (msg.response.hasOwnProperty("error")) {
                    Tools.print("DEVICES", device + " : " + parseInt(devices[device].id) + " is INVALID.");
                }
                else {
                    Tools.print("DEVICES", device + " : " + parseInt(devices[device].id) + " is VALID.");
                }
            });
        }
    }
});

/* Whenever the rust server disconnects. */
rustplus.on("disconnected", () => {
    let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);

    if (connected) {
        connected = false;

        if (typeof (channel) === "undefined") {
            Tools.print("ERROR", "discordBotSpamChannel is invalid in config.json.");
            return;
        }

        Tools.print("ATTENTION", "RustPlus-Discord-Bot lost connection to the rust server... " +
            "Will attempt to reconnect...", channel);
    }

    if ((reconnectAttempts === parseInt(config.general.reconnectAttempts)) &&
        (parseInt(config.general.reconnectAttempts) !== 0)) {
        Tools.print("Reconnection Failed", "RustPlus-Discord-Bot failed to reconnect to the rust server, exiting...", channel);
        setTimeout(destroyBot, 3000);
        return;
    }

    reconnectRustplus();
});

/* Whenever an error occurs. */
rustplus.on("error", (err) => {
    Tools.print("ERROR", err);
});

rustplus.on("message", (msg) => {
    if (msg.hasOwnProperty("broadcast")) {
        config = Tools.readJSON("./config.json");

        if (msg.broadcast.hasOwnProperty("teamMessage")) {
            Tools.print("BROADCAST", "teamMessage received.");

            let message = msg.broadcast.teamMessage.message.message;
            let author = msg.broadcast.teamMessage.message.name;
            let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);

            if (typeof (channel) === "undefined") {
                Tools.print("ERROR", "discordBotSpamChannel is invalid in config.json.");
                return;
            }

            parseCommand(author, message, channel, true);
        }
        else if (msg.broadcast.hasOwnProperty("entityChanged")) {
            Tools.print("BROADCAST", "entityChanged triggered.");

            let devices = Tools.readJSON("./devices.json");
            let channel = discordBot.channels.cache.get(config.discord.botSpamChannel);

            if (typeof (channel) === "undefined") {
                Tools.print("ERROR", "discordBotSpamChannel is invalid in config.json.");
                return;
            }

            for (let device in devices) {
                if (devices[device].id === msg.broadcast.entityChanged.entityId) {
                    if (devices[device].type === 1) { /* Switch */
                        break;
                    }
                    else if (devices[device].type === 2) { /* Alarm */
                        if (config.alarms.enabled === "false") break;

                        if (msg.broadcast.entityChanged.payload.value === true) {
                            if (config.alarms.inGame === "true") {
                                Tools.print("ALARM", devices[device].alarmMessage, channel, rustplus, alarmAttachment,
                                    "smart_alarm.png");
                            }
                            else {
                                Tools.print("ALARM", devices[device].alarmMessage, channel, null, alarmAttachment,
                                    "smart_alarm.png");
                            }
                        }
                        break;
                    }
                    else if (devices[device].type === 3) { /* Storage Monitor */
                        if (config.storageMonitors.enabled === "false") break;

                        /* Make sure that we only trigger on one of the two, either true or false. */
                        if (msg.broadcast.entityChanged.payload.value === false) {
                            let items = Tools.readJSON("./tools/items.json");
                            let summed = {};

                            if (msg.broadcast.entityChanged.payload.hasOwnProperty("items")) {
                                for (let item of msg.broadcast.entityChanged.payload.items) {
                                    if (item.itemId in summed) {
                                        summed[item.itemId] += item.quantity;
                                    }
                                    else {
                                        summed[item.itemId] = item.quantity;
                                    }
                                }
                            }

                            let title = "Storage Monitor";
                            let description = "";
                            const embed = new Discord.MessageEmbed()
                                .setColor("#ce412b")
                                .attachFiles(storageAttachment)
                                .setThumbnail("attachment://storage_monitor.png")
                                .setURL(this.GITHUB_URL)
                                .setTitle(title);

                            /* If a 'Tool Cupboard'. */
                            if (msg.broadcast.entityChanged.payload.capacity === 24) {
                                description = "Content of the Tool Cupboard **" + device + "** have changed.";
                            }
                            /* If a 'Large Wood Box' or a 'Vending Machine'. */
                            else if (msg.broadcast.entityChanged.payload.capacity === 30) {
                                description = "Content of the Large Wood Box/ Vending Machine **" + device +
                                    "** have changed.";
                            }

                            embed.setDescription(description)

                            let field = "**Items in '" + device + "':**";
                            let str = "";
                            for (let item in summed) {
                                if (item in items) {
                                    str += summed[item] + "x of **" + items[item].name + "**\n";
                                }
                                else {
                                    str += summed[item] + "x of **Unknown Item**\n";
                                }
                            }

                            if (str === "") {
                                str = "No items.";
                            }

                            description += "\n" + field + "\n" + str;
                            embed.addField(field, str);

                            Tools.print(title, description);
                            channel.send(embed);
                        }
                        break;
                    }

                }
            }
        }
    }
});

/* Connect to the rust server */
rustplus.connect();

/* Start the map marker polling */
setTimeout(mapMarkerPolling, 10000);
