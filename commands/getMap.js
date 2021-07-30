const Discord = require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");
const Tools = require("../tools/tools.js");

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
    "water_treatment_plant_display_name": "WATER TREATMENT PLANT"
}

module.exports = {
    name: "getMap",
    description: "Fetch map info, which includes a jpeg image.",
    execute(message, args, discordBot, rustplus) {
        if (args.length != 0) {
            let title = "ERROR";
            let description = "No arguments required.";
            console.log(title + ": " + description);
            Tools.sendEmbed(message.channel, title, description);
            return false;
        }

        rustplus.getMap((msg) => {
            console.log(">> Request : getMap <<");

            if (msg.response.hasOwnProperty("error")) {
                console.log(">> Response message : getMap <<\n" + JSON.stringify(msg));

                let title = "ERROR";
                let description = "Some error occured while sending the request to the server.";
                console.log(title + ": " + description);
                Tools.sendEmbed(message.channel, title, description);
            }
            else {
                /* Write the received image to a file. */
                fs.writeFileSync(MarkerImagePath[Tools.MarkerType.Source], msg.response.map.jpgImage);

                var jimps = [];
                for (var i = 0; i < MarkerImagePath.length; i++) {
                    jimps.push(Jimp.read(MarkerImagePath[i]));
                }

                Promise.all(jimps).then(function (markerImage) {
                    return Promise.all(jimps);
                }).then(function (markerImage) {
                    for (var i = 1; i < markerImage.length; i++) {
                        var size = MarkerImageSize[i];
                        markerImage[i].resize(size, size);
                    }

                    rustplus.getInfo((info) => {
                        console.log(">> Request : getInfo <<");

                        if (info.response.hasOwnProperty("error")) {
                            console.log(">> Response message : getMap => getInfo <<\n" + JSON.stringify(info));

                            let title = "ERROR";
                            let description = "Some erorr occured while sending the request to the server."
                            console.log(title + ": " + description);
                            Tools.sendEmbed(message.channel, title, description);
                        }
                        else {
                            rustplus.getMapMarkers((mapMarkers) => {
                                console.log(">> Request : getMapMarkers <<");
                                if (mapMarkers.response.hasOwnProperty("error")) {
                                    console.log(">> Response message : getMap => getMapMarkers <<\n" + JSON.stringify(mapMarkers));

                                    let title = "ERROR";
                                    let description = "Some error occured while sending the request to the server.";
                                    console.log(title + ": " + description);
                                    Tools.sendEmbed(message.channel, title, description);
                                }
                                else {
                                    let mapSize = info.response.info.mapSize;
                                    let width = msg.response.map.width;
                                    let height = msg.response.map.height;
                                    let oceanMargin = msg.response.map.oceanMargin;

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

                                            markerImage[Tools.MarkerType.Source].composite(markerImage[marker.type], x - (size / 2), y - (size / 2));
                                        }
                                        catch (err) {
                                            /* Ignore */
                                        }
                                    }

                                    Jimp.loadFont("./fonts/PermanentMarker.fnt").then(function (font) {
                                        for (let monument of msg.response.map.monuments) {
                                            var x = monument.x * ((width - 2 * oceanMargin) / mapSize) + oceanMargin;
                                            var n = height - 2 * oceanMargin;
                                            var y = height - (monument.y * (n / mapSize) + oceanMargin);

                                            try {
                                                if (monument.token === "train_tunnel_display_name") {
                                                    var size = MarkerImageSize[Tools.MarkerType.TrainTunnels];
                                                    markerImage[Tools.MarkerType.Source].composite(markerImage[Tools.MarkerType.TrainTunnels], x - (size / 2), y - (size / 2));
                                                }
                                                else {
                                                    /* Compensate for the text placement */
                                                    var posCompensation = Monument[monument.token].length * 5;
                                                    markerImage[Tools.MarkerType.Source].print(font, x - posCompensation, y - 10, Monument[monument.token]);
                                                }
                                            }
                                            catch (err) {
                                                /* Ignore */
                                            }
                                        }

                                        markerImage[Tools.MarkerType.Source].write(MarkerImagePath[Tools.MarkerType.Source], (err) => {
                                            const image = fs.readFileSync("./" + MarkerImagePath[Tools.MarkerType.Source]);
                                            const attachment = new Discord.MessageAttachment(image);
                                            message.channel.send("Server '**" + info.response.info.name + "**' Map:", attachment);

                                            /* Remove temp image file. */
                                            try {
                                                fs.unlinkSync("./" + MarkerImagePath[Tools.MarkerType.Source]);
                                            }
                                            catch (err) {
                                                console.error(err);
                                            }
                                        });
                                    }).catch(function (err) {
                                        console.log(err);
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });

        return true;
    },
};
