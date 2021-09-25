# **Documentation**

## **Commands**

### **addDevice**
This command lets you add different devices to the devices.json located on the bot server.

To add a Smart Switch:

    !addDevice nameOfSwitch entityId
    # Example:
    !addDevice switch1 1234567

To add a Smart Alarm:

    !addDevice nameOfAlarm entityId
    # Example:
    !addDevice oilrig 1234567

To add a Storage Monitor:

    !addDevice nameOfSM entityId
    # Example:
    !addDevice toolcupboard 1234567

### **devices**
This command prints all the registered devices in the devices.json located on the bot server.

### **getCameraFrame**
This command gathers a jpeg frame from a camera in-game and sends it to discord (**NOTE**: Feature not currently supported).

Get a frame from 'CASINO' camera at Bandit Camp:

    !getCameraFrame CASINO 0

### **getEntityInfo**
This command gathers information about a smart device and prints it to discord.

To get the entity information from Smart Switch 1234567 (Made up):

    !getEntityInfo 1234567

To get the entity information from Smart Alarm 'oilrig' defined in devices.json:

    !getEntityInfo oilrig

### **getInfo**
This command prints information about the server.

### **getMap**
This command gathers a jpeg image of the server map and all it's monuments and sends it to discord.

### **getMapMarkers**
This command gathers all the map markers of the server map (**NOTE**: Currently not useful for anything by itself).

### **getSettings**
This command gathers all the public settings from the config.json file and prints it to discord.

### **getTeamInfo**
This command gathers information about the team and prints it to discord.

### **getTime**
This command gathers the in-game time of the server and prints it to discord.

### **help**
This command prints a help message.

For help of a specific command type:

    !help theCommand
    # Example:
    !help addDevice

### **market**
This command goes through all vending machines on the server and look for the specified item.

To look through all items on the market, type:

    !market

To look for a specific item, type:

    !market Assault Rifle

Or if you dont know the full name, part of the name will be fine:

    !market assa

### **removeAllDevices**
This command will remove all registered devices in the devices.json located on the bot server.

### **removeDevice**
This command will remove the specified device from devices.json located on the bot server.

To remove Smart Switch 'Switch1':

    !removeDevice Switch1

### **sendTeamMessage**
This command sends a team message in-game.

To send a team message In-Game:

    !sendTeamMessage theMessage
    # Example:
    !sendTeamMessage Hello there!

### **setAlarmNotifications**
This command lets you set the Alarm Notifications to enable/disable.

To turn off Alarm Notifications:

    !setAlarmNotifications false

To turn on Alarm Notifications:

    !setAlarmNotifications true

### **setCargoShipNotifications**
This command lets you set the Cargo Ship Notifications to enable/disable.

To turn off Cargo Ship Notifications:

    !setCargoShipNotifications false

To turn on Cargo Ship Notifications:

    !setCargoShipNotifications true

### **setChinook47Notifications**
This command lets you set the Chinook 47 Notifications to enable/disable.

To turn off Chinook 47 Notifications:

    !setChinook47Notifications false

To turn on Chinook 47 Notifications:

    !setChinook47Notifications true

### **setCrateNotifications**
This command lets you set the Crate Notifications to enable/disable.

To turn off Crate Notifications:

    !setCrateNotifications false

To turn on Crate Notifications:

    !setCrateNotifications true

### **setEntityValue**
This command lets you change the entity value of a Smart Switch.

To set the entity value of Smart Switch 'light' to false:

    !setEntityValue light false

To set the entity value of Smart Switch 'light' to true:

    !setEntityValue light true

### **setExplosionNotifications**
This command lets you set the Explosion Notifications to enable/disable.

To turn off Explosion Notifications:

    !setExplosionNotifications false

To turn on Explosion Notifications:

    !setExplosionNotifications true

### **setInGameAlarmNotifications**
This command lets you set the In-Game Alarm Notifications to enable/disable.

To turn off In-Game Alarm Notifications:

    !setInGameAlarmNotifications false

To turn on In-Game Alarm Notifications:

    !setInGameAlarmNotifications true

### **setInGameCommands**
This command lets you set the In-Game commands ability to enable/disable.

To turn off In-Game commands:

    !setInGameCommands false

To turn on In-Game commands:

    !setInGameCommands true

### **setInGameNotifications**
This command lets you set the In-Game Notifications to enable/disable.

To turn off In-Game Notifications:

    !setInGameNotifications false

To turn on In-Game Notifications:

    !setInGameNotifications true

### **setInGamePairingNotifications**
This command lets you set the In-Game Pairing Notifications to enable/disable.

To turn off In-Game Pairing Notifications:

    !setInGamePairingNotifications false

To turn on In-Game Pairing Notifications:

    !setInGamePairingNotifications true

### **setNotifications**
This command lets you set the Notifications to enable/disable.

To turn off Notifications:

    !setNotifications false

To turn on Notifications:

    !setNotifications true

### **setPairingNotifications**
This command lets you set the Pairing Notifications to enable/disable.

To turn off Pairing Notifications:

    !setPairingNotifications false

To turn on Pairing Notifications:

    !setPairingNotifications true

### **setPrefix**
This command lets you change the command prefix for the bot.

To change the prefix to / from !:

    !setPrefix /

### **setStorageMonitorNotifications**
This command lets you set the Storage Monitor Notifications to enable/disable.

To turn off Storage Monitor Notifications:

    !setStorageMonitorNotifications false

To turn on Storage Monitor Notifications:

    !setStorageMonitorNotifications true

### **turnOff**
This command lets you turn off Smart Switches.

To turn off Smart Switch 'turret':

    !turnOff turret

To turn off Smart Switches 'turret1', 'turret2' and 'turret3':

    !turnOff turret*
    # or
    !turnOff turret1 turret2 turret3

To turn off Smart Switch with entityId 1234567:

    !turnOff 1234567

### **turnOn**
This command lets you turn on Smart Switches.

To turn on Smart Switch 'turret':

    !turnOn turret

To turn on Smart Switches 'turret1', 'turret2' and 'turret3':

    !turnOn turret*
    # or
    !turnOn turret1 turret2 turret3

To turn on Smart Switch with entityId 1234567:

    !turnOn 1234567

### **ver**
This command prints this bots current version.


## **config.json**

    {
        "general": {
            "prefix": "!",
            "steamId": "1234567890",
            "reconnectAttempts": "30",
            "inGameCommands": "true"
        },
        "notifications": {
            "enabled": "true",
            "inGame": "true",
            "cargoShip": "true",
            "chinook47": "true",
            "crate": "false",
            "explosion": "true"
        },
        "alarms": {
            "enabled": "true",
            "inGame": "true"
        },
        "storageMonitors": {
            "enabled": "true"
        },
        "discord": {
            "token": "abcdefghijklmnopqrstuvwxyz",
            "botSpamChannel": "1234567890"
        },
        "rustplus": {
            "fcmListener": "true",
            "pairingNotifications": "true",
            "inGamePairingNotifications": "true"
        },
        "rust": {
            "serverIp": "111.222.333.444",
            "appPort": "12345",
            "playerToken": "1234567890"
        }
    }

### **general.prefix**
This decides which prefix symbol should be used for the bot, length of the symbol has to be 1.

### **general.steamId**
The Steam Id of the player that sets the bot up/ owns the rustplus.config.json file.

### **general.reconnectAttempts**
The amount of reconnection attempts if the rust server were to go down. Default is 30, set it to 0 to have endless reconnection attempts.

### **general.inGameCommands**
Having this set to true makes it possible to run bot commands from in-game team chat. If in the same team as the one who set up the bot.

### **notifications.enabled**
Having this set to true allows notifications in discord. Notifications is either Cargo Ship spawn, Chinook 47 spawn, Crate detection or Explosion detection.

### **notifications.inGame**
Having this set to true allows notifications to be forwarded to in-game team chat.

### **notifications.cargoShip**
Having this set to true allows Cargo Ship spawn notifications.

### **notifications.chinook47**
Having this set to true allows Chinook 47 spawn notifications.

### **notifications.crate**
Having this set to true allows Crate detection notifications.

### **notifications.explosion**
Having this set to true allows Explosion detection notifications.

### **alarms.enabled**
Having this set to true allows alarms in discord. Alarms are triggered via in-game Smart Alarms.

### **alarms.inGame**
Having this set to true allows alarms to be forwarded to in-game team chat.

### **storageMonitor.enabled**
Having this set to true allows Storage Monitors to notify whenever it changes it's content and prints the content to discord. It also give you an approximation of time left before decaying if the storage monitor is set on a Tool Cupboard. NOTE: The time left before decaying seem to be one step behind so whenever something gets added or removed from it shows the time left before the content was moved.

### **discord.token**
This is the Discord Bot Token.

### **discord.botSpamChannel**
This is the Discord Text Channel that is used for notifications and alarms.

### **rustplus.fcmListener**
Having this set to true allows pairing notifications as well as Smart Alarm functionality.

### **rustplus.pairingNotifications**
Having this set to true allows pairing notifications in discord. Pairing notification messages include a entityId that needs to be registered via addDevice for Smart Switches and Storage Monitors. Smart Alarms automatically gets paired when pairing in-game.

### **rustplus.inGamePairingNotifications**
Having this set to true allows pairing notifications to be forwarded to in-game team chat.

### **rust.serverIp**
This is the Rust Server ip address.

### **rust.appPort**
This is the Rust Server app port. Not the port used to connect to the server, this is the Rust+ port used for the Rust Server.

### **rust.playerToken**
This is a Rust Server Player Token that is specific for every Rust Server you use the bot on. When you decide you want to use the bot on another server, you will need to run the *tools/external/copy_server_details_to_config.js* script again to update **serverIp**, **appPort** and **playerToken**.
