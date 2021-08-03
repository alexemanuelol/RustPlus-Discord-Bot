const Main = require("./../rustplusDiscordBot.js");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    readJSON: function (path) {
        let data = fs.readFileSync(path, "utf8");
        return JSON.parse(data);
    },

    writeJSON: function (path, property, value) {
        let jsonObj = module.exports.readJSON(path);
        jsonObj[property] = value;
        fs.writeFileSync(path, JSON.stringify(jsonObj, null, 2));
    },

    sendEmbed: function (discordChannel, title, description, field = null, attachment = Main.THUMBNAIL_DEFAULT, thumbnailName = "rust_logo.png") {
        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(attachment)
            .setThumbnail("attachment://" + thumbnailName)
            .setURL(Main.GITHUB_URL)
            .setTitle(title)
            .setDescription(description);

        if (field !== null) {
            embed.addField(field[0], field[1]);
        }

        discordChannel.send(embed);
    },

    wildcardMatch: function (str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    },

    print: function (title, description, channel = null, rustplus = null, attachment = Main.THUMBNAIL_DEFAULT, thumbnailName = "rust_logo.png") {
        let date = new Date();
        let hours = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours();
        let minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds();

        let time = "(" + hours + ":" + minutes + ":" + seconds + ") ";

        /* Print to console. */
        console.log(time + "[" + title + "] " + description);

        /* If team message enabled. */
        if (rustplus !== null) {
            rustplus.sendTeamMessage("[" + title + "] " + description);
        }

        /* If discord message enabled. */
        if (channel !== null) {
            module.exports.sendEmbed(channel, title, description, null, attachment, thumbnailName);
        }
    },

    validateResponse: function (response, channel) {
        if (response.response.hasOwnProperty("error")) {
            module.exports.print("ERROR", "The response message include errors, Make sure that command inputs are valid.", channel);
            return false;
        }
        else {
            return true;
        }
    },

    MarkerType: {
        Source: 0,
        Player: 1,
        Explosion: 2,
        VendingMachine: 3,
        CH47: 4,
        CargoShip: 5,
        Crate: 6,
        GenericRadius: 7,
        TrainTunnels: 8,
    },

    EntityType: {
        1: "Switch",
        2: "Alarm",
        3: "Storage Monitor"
    },
}
