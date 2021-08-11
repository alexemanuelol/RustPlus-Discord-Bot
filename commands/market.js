const Discord = require("discord.js");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");

const thumbnailName = "vending_machine.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command goes through all vending machines on the server and look for the specified item.

**To look through all items on the market, type**:
    ${prefix}market

**To look for a specific item, type**:
    ${prefix}market Assault Rifle

**Or if you dont know the full name, part of the name will be fine**:
    ${prefix}market assa`

module.exports = {
    name: "market",
    description: "Search for items for sale in vending machines all over the server.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Send the rustplus.js request: getMapMarkers */
        rustplus.getMapMarkers((msg) => {
            Tools.print("REQUEST", "getMapMarkers");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getMapMarkers\n" + JSON.stringify(msg));
                return false;
            }

            let items = Tools.readJSON("./tools/items.json");

            /* If args is not empty, that means the user is looking for something. */
            let originalSearchItemName = "";
            let searchItem = "";
            if (args.length !== 0) {
                originalSearchItemName = message.replace(config.general.prefix + "market ", "");
                searchItem = originalSearchItemName.toLowerCase();
            }

            let title = "Market Search";
            let description = "";
            if (searchItem !== "") {
                description = "The result of a market search for the item **" + originalSearchItemName + "**.";
            }
            else {
                description = "The result of a market search.";
            }

            let maxLength = 4000;
            let currentLength = title.length + description.length;

            let embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .attachFiles(attachment)
                .setThumbnail("attachment://" + thumbnailName)
                .setURL(Main.GITHUB_URL)
                .setTitle(title)
                .setDescription(description);


            let resultsFound = false;
            for (let marker of msg.response.mapMarkers.markers) {
                if (marker.type === Tools.MarkerType.VendingMachine) {
                    if (marker.hasOwnProperty("sellOrders")) {
                        let field = marker.name;
                        let str = "";

                        for (let order of marker.sellOrders) {
                            let selling = (order.itemId in items) ? items[order.itemId].name : "Unknown";
                            let quantity = order.quantity;
                            let currency = (order.currencyId in items) ? items[order.currencyId].name : "Unknown";
                            let costPerItem = order.costPerItem;

                            /* If no specific item was provided. */
                            if (searchItem === "") {
                                resultsFound = true;

                                str += quantity + "x **" + selling + "** for " + costPerItem + "x **" + currency
                                    + "**.\n";
                            }
                            else {
                                /* Does the order contain the specified item in question? */
                                if ((selling.toLowerCase()).includes(searchItem) ||
                                    (currency.toLowerCase()).includes(searchItem) ||
                                    Tools.similarity(searchItem, selling) >= 0.9 ||
                                    Tools.similarity(searchItem, currency) >= 0.9) {
                                    resultsFound = true;
                                    str += quantity + "x **" + selling + "** for " + costPerItem + "x **" + currency
                                        + "**.\n";
                                }
                            }
                        }

                        /* If no specified item was found in the shop. */
                        if (str === "") {
                            continue;
                        }
                        else {
                            if ((currentLength + field.length + str.length) < maxLength) {
                                currentLength += field.length + str.length;
                                embed.addField(field, str);
                            }
                            else {
                                /* Max size of embed have been reached, empty buffer and create new embed. */
                                Tools.print(title.description);
                                channel.send(embed);

                                /* Clear the embed variable and replace with a fresh. */
                                embed = new Discord.MessageEmbed()
                                    .setColor("#ce412b")
                                    .attachFiles(attachment)
                                    .setThumbnail("attachment://" + thumbnailName)
                                    .setURL(Main.GITHUB_URL)
                                    .setTitle(title)
                                    .setDescription(description);

                                currentLength = title.length + description.length + field.length + str.length;
                                embed.addField(field, str);
                            }
                        }
                    }
                }
            }

            if (!resultsFound) {
                description = "No market items found named **" + originalSearchItemName + "**.\nTry to run the " +
                    "command *" + config.general.prefix + "market* without any arguments to get all market items.";
                embed.setDescription(description);
            }

            Tools.print(title, description);
            channel.send(embed);
        });

        return true;
    },
};
