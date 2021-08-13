/*
 * This script is used to automatically update the config.json with rust server details when you click
 * 'PAIR WITH SERVER' or 'RESEND'. By clicking a notification message gets triggered that includes
 * steamId, serverIp, appPort, playerToken.
 */

const { register, listen } = require('push-receiver');
const fs = require("fs");

var fcmClient;
var fcmReady = false;

function setFcmReady() {
    console.log("[INFO] Enter the Rust Server and go into Rust+ and press 'PAIR WITH SERVER' or 'RESEND'. " +
        "This will trigger a notification message that includes steamId, serverIp, appPort and playerToken. " +
        "These parameters will automatically be updated in the config.json file.");
    fcmReady = true;
}

async function listenRustplusDetails() {
    if (fs.existsSync("./../../rustplus.config.json")) {
        console.log("[SUCCESS] rustplus.config.json file was found!");
    }
    else {
        console.log("[ERROR] rustplus.config.json file does not exist inside root folder.\n Try running the command" +
            ": 'npx @liamcottle/rustplus.js fcm-register' and then place the output 'rustplus.config.json' file in " +
            "the root folder of the RustPlus-Discord-Bot.");
        process.exit(1);
    }

    const rustPlusConfig = JSON.parse(fs.readFileSync("./../../rustplus.config.json", "utf8"));
    const config = JSON.parse(fs.readFileSync("./../../config.json", "utf8"));

    /* Make sure that fcm credentials are in config. */
    if (!rustPlusConfig.fcm_credentials) {
        console.log("[ERROR] FCM Credentials missing. Please run: 'npx @liamcottle/rustplus.js fcm-register' and " +
            "then place the output 'rustplus.config.json' file in the root folder of the RustPlus-Discord-Bot.");
        process.exit(1);
    }

    fcmClient = await listen(rustPlusConfig.fcm_credentials, ({ notification, persistentId }) => {
        /* Create a delay so that buffered notifications are ignored. */
        if (!fcmReady) return;

        /* Parse the notification body. */
        const data = notification.data;
        const body = JSON.parse(notification.data.body);

        if (data.channelId !== "pairing") return;

        let steamId = body.playerId;
        let serverIp = body.ip;
        let appPort = body.port;
        let playerToken = body.playerToken;

        config.general.steamId = steamId;
        config.rust.serverIp = serverIp;
        config.rust.appPort = appPort;
        config.rust.playerToken = playerToken;

        fs.writeFileSync("./../../config.json", JSON.stringify(config, null, 2));

        console.log("[UPDATE] Following have been written to config.json");
        console.log("    steamId:      " + steamId);
        console.log("    serverIp:     " + serverIp);
        console.log("    appPort:      " + appPort);
        console.log("    playerToken:  " + playerToken + "\n");
    });
}

listenRustplusDetails();
setTimeout(setFcmReady, 3000);