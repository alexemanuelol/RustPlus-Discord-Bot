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

    sendEmbed: function (discordChannel, title, description, field = null) {
        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .setThumbnail(Main.THUMBNAIL_URL)
            .setURL(Main.GITHUB_URL)
            .setTitle(title)
            .setDescription(description);

        if (field !== null) {
            embed.addField(field[0], field[1]);
        }

        discordChannel.send(embed);
    },

}
