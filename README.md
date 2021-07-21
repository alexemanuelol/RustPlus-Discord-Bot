![Rust+ Discord icon](images/rustplus_discord.png)

# RustPlus-Discord-Bot
This is an NodeJS Discord Bot that uses the rustplus.js library to interact with Smart Devices in the PC game [Rust](https://store.steampowered.com/app/252490/Rust/).


## Install

To clone the repository:

    $ git clone https://github.com/alexemanuelol/RustPlus-Discord-Bot.git

Install the required nodejs modules:

    $ cd RustPlus-Discord-Bot
    $ npm install


## Setup

To be able to run the bot there are a few configuration parameters that needs to be set in the config.json file located at *src/config.json*:

1. **discordToken** - Follow [this](https://realpython.com/how-to-make-a-discord-bot-python/) guide for how to setup an application, bot creation for the discord server and how to access the token.
2. **rustServerIp** - The server IP address.
3. **rustAppPort** - Rust app port for communicating via App WebSocket.
4. **steamId** - Your steam ID.
5. **rustPlayerToken** - Rust player token from server pairing.

### Obtaining rustAppPort, rustPlayerToken and smart devices entity ids

To obtain the rustAppPort and rustPlayerToken, follow ![this](https://github.com/liamcottle/rustplus.js/blob/master/README.md#pairing) guide.

When the fcm-listen is running, you simply pair up the smart devices you have in-game and the notifications will appear in the fcm-listen terminal.

## Discord Bot Commands

Default command prefix: **!**

- **addDevice @name @id** - Add a device to the devices.json file.
- **devices** - Print all registered devices in the devices.json file.
- **getCameraFrame @name @frame** - Get a jpeg image from a CCTV Camera.
- **getEntityInfo @name** - Get the current state of a Smart Device.
- **getInfo** - Get info about the Rust Server.
- **getMap** - Fetch map info, which includes a jpeg image.
- **getMapMarkers** - Get map markers, such as vending machines and cargo/heli.
- **getTeamInfo** - Get list of team members and positions on map.
- **getTime** - Get the current in game time.
- **help** - Print a help message.
- **removeAllDevices** - Remove all devices in the devices.json file.
- **removeDevice @name** - Remove a device from the devices.json file.
- **sendTeamMessage** - Send messages to Team Chat.
- **setEntityValue @name @value** - Set the value of a Smart Device.
- **turnOff @name/id ...** - Turn off a Smart Switch.
- **turnOn @name/id ...** - Turn on a Smart Switch.
- **ver** - Print the current version of the bot.


## Thanks to
- **liamcottle** - for the rustplus.js API
    - https://github.com/liamcottle/rustplus.js
