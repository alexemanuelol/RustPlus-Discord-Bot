const Discord = require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");

const mapName = "temp_map_image.jpg";

const MarkerImagePath = [
    mapName,
    "./images/player.png",
    "./images/explosion_marker.png",
    "./images/shop_green.png",
    "./images/chinook_map_body.png",
    "./images/cargo_ship_body.png",
    "./images/crate.png",
    "./images/chinook_map_blades.png",
    "./images/train_tunnels.png"
]

const MarkerImageSize = [
    null,
    20,
    30,
    20,
    50,
    100,
    25,
    25,
    35
]

const Monument = {
    "airfield_display_name": "AIRFIELD",
    "bandit_camp": "BANDIT CAMP",
    "dome_monument_name": "THE DOME",
    "excavator": "GIANT EXCAVATOR PIT",
    "fishing_village_display_name": "FISHING VILLAGE",
    "gas_station": "OXUM'S GAS STATION",
    "harbor_2_display_name": "HARBOR",
    "harbor_display_name": "HARBOR",
    "junkyard_display_name": "JUNKYARD",
    "large_fishing_village_display_name": "LARGE FISHING VILLAGE",
    "large_oil_rig": "LARGE OIL RIG",
    "launchsite": "LAUNCH SITE",
    "lighthouse_display_name": "LIGHTHOUSE",
    "military_tunnels_display_name": "MILITARY TUNNEL",
    "mining_outpost_display_name": "MINING OUTPOST",
    "mining_quarry_hqm_display_name": "HQM QUARRY",
    "mining_quarry_stone_display_name": "STONE QUARRY",
    "mining_quarry_sulfur_display_name": "SULFUR QUARRY",
    "oil_rig_small": "OIL RIG",
    "outpost": "OUTPOST",
    "power_plant_display_name": "POWER PLANT",
    "satellite_dish_display_name": "SATELLITE DISH",
    "sewer_display_name": "SEWER BRANCH",
    "stables_a": "RANCH",
    "stables_b": "LARGE BARN",
    "supermarket": "ABANDONED SUPERMARKET",
    "swamp_c": "ABANDONED CABINS",
    "train_tunnel_display_name": "",
    "train_yard_display_name": "TRAIN YARD",
    "underwater_lab": "UNDERWATER LAB",
    "water_treatment_plant_display_name": "WATER TREATMENT PLANT"
}

module.exports = {
    name: "getMap",
    description: "Fetch map info, which includes a jpeg image.",
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Verify that there are no arguments. */
        if (args.length != 0) {
            Tools.print("ERROR", "No arguments required.", channel);
            return false;
        }

        /* Send the rustplus.js request: getMap */
        rustplus.getMap((msg) => {
            Tools.print("REQUEST", "getMap");

            /* Validate that the response message does not include any errors. */
            if (!Tools.validateResponse(msg, channel)) {
                Tools.print("RESPONSE", "getMap\n" + JSON.stringify(msg));
                return false;
            }

            /* Write the received image bytes to a file. */
            fs.writeFileSync(MarkerImagePath[Tools.MarkerType.Source], msg.response.map.jpgImage);

            /* Read all the marker images via Jimp. */
            var jimps = [];
            for (var i = 0; i < MarkerImagePath.length; i++) {
                jimps.push(Jimp.read(MarkerImagePath[i]));
            }

            /* Wait for all Jimp images to load. */
            Promise.all(jimps).then(function (markerImage) {
                return Promise.all(jimps);
            }).then(function (markerImage) {
                /* Resize the Jimp images. */
                for (var i = 1; i < markerImage.length; i++) {
                    var size = MarkerImageSize[i];
                    markerImage[i].resize(size, size);
                }

                /* Send the rustplus.js request: getInfo */
                rustplus.getInfo((info) => {
                    Tools.print("REQUEST", "getInfo");

                    /* Validate that the response message does not include any errors. */
                    if (!Tools.validateResponse(info, channel)) {
                        Tools.print("RESPONSE", "getMap => getInfo\n" + JSON.stringify(info));
                        return false;
                    }

                    /* Send the rustplus.js request: getMapMarkers */
                    rustplus.getMapMarkers((mapMarkers) => {
                        Tools.print("REQUEST", "getMapMarkers");

                        /* Validate that the response message does not include any errors. */
                        if (!Tools.validateResponse(mapMarkers, channel)) {
                            Tools.print("RESPONSE", "getMap => getMapMarkers\n" + JSON.stringify(mapMarkers));
                            return false;
                        }

                        let mapSize = info.response.info.mapSize;
                        let width = msg.response.map.width;
                        let height = msg.response.map.height;
                        let oceanMargin = msg.response.map.oceanMargin;

                        /* For all map markers, append them to original map image. */
                        for (let marker of mapMarkers.response.mapMarkers.markers) {
                            var x = marker.x * ((width - 2 * oceanMargin) / mapSize) + oceanMargin;
                            var n = height - 2 * oceanMargin;
                            var y = height - (marker.y * (n / mapSize) + oceanMargin);

                            /* Compensate rotations */
                            if (marker.type === Tools.MarkerType.CargoShip) {
                                x -= 20;
                                y -= 20;
                            }

                            try {
                                var size = MarkerImageSize[marker.type];

                                /* Rotate */
                                markerImage[marker.type].rotate(marker.rotation);

                                markerImage[Tools.MarkerType.Source].composite(markerImage[marker.type], x -
                                    (size / 2), y - (size / 2));
                            }
                            catch (err) {
                                /* Ignore */
                            }
                        }

                        /* Load Permanent Marker font. */
                        Jimp.loadFont("./fonts/PermanentMarker.fnt").then(function (font) {
                            /* Append names for all the monuments to original map image. */
                            for (let monument of msg.response.map.monuments) {
                                var x = monument.x * ((width - 2 * oceanMargin) / mapSize) + oceanMargin;
                                var n = height - 2 * oceanMargin;
                                var y = height - (monument.y * (n / mapSize) + oceanMargin);

                                try {
                                    if (monument.token === "train_tunnel_display_name") {
                                        var size = MarkerImageSize[Tools.MarkerType.TrainTunnels];
                                        markerImage[Tools.MarkerType.Source].composite(markerImage[
                                            Tools.MarkerType.TrainTunnels], x - (size / 2), y - (size / 2));
                                    }
                                    else {
                                        /* Compensate for the text placement */
                                        var posCompensation = Monument[monument.token].length * 5;
                                        markerImage[Tools.MarkerType.Source].print(font, x - posCompensation, y - 10,
                                            Monument[monument.token]);
                                    }
                                }
                                catch (err) {
                                    /* Ignore */
                                }
                            }

                            /* Write the original map image with all the added content. */
                            markerImage[Tools.MarkerType.Source].write(MarkerImagePath[Tools.MarkerType.Source],
                                (err) => {
                                    const image = fs.readFileSync(MarkerImagePath[Tools.MarkerType.Source]);
                                    const attachment = new Discord.MessageAttachment(image, mapName);
                                    const embed = new Discord.MessageEmbed()
                                        .setColor("#ce412b")
                                        .attachFiles(Main.THUMBNAIL_DEFAULT)
                                        .setThumbnail("attachment://rust_logo.png")
                                        .setURL(Main.GITHUB_URL)
                                        .setTitle("Server Map")
                                        .setDescription("The map of the server '**" + info.response.info.name + "**'.")
                                        .attachFiles(attachment)
                                        .setImage("attachment://" + mapName);

                                    channel.send(embed);

                                    /* Remove temp image file. */
                                    try {
                                        fs.unlinkSync(MarkerImagePath[Tools.MarkerType.Source]);
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                });
                        }).catch(function (err) {
                            Tools.print("ERROR", err);
                        });
                    });
                });
            });
        });

        return true;
    },
};
