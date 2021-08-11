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

    convertToHoursMinutes: function (value) {
        let hours = Math.floor(value);
        let minutes = Math.floor((value - hours) * 60);

        hours = (hours < 10) ? ("0" + hours).toString() : hours.toString();
        minutes = (minutes < 10) ? ("0" + minutes).toString() : minutes.toString();

        return hours + ":" + minutes;
    },

    similarity: function (s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }

        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }

        return (longerLength - module.exports.editDistance(longer, shorter)) / parseFloat(longerLength);
    },

    editDistance: function (s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    },

    isStringBool: function (arg) {
        if (arg === "true" || arg === "false") return true;

        return false;
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
        1: "Smart Switch",
        2: "Smart Alarm",
        3: "Storage Monitor"
    },
}
