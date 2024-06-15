# base-bot-v14
Base bot for discord.js v14

The original version was created by Niridya : https://github.com/niridya/base-bot-v14

## Introduction
This code is a sample optimized and organized bot using Discord.js v14, including Slash commands and dynnamic help command.

## Before use
- Install Node.js (>16)
- Install Visual Studio Code (recommanded)

## Installation
```sh
npm install
```

## Start
```sh
npm index.js
```

## Configuration
### shadow.json

```json
{
    "token": "Yout bot token"
}
```
To get a token :
* Go to https://discord.dev
* Create an app (or open one)
* Go to Bot and click on "Reset Token"
* Click on "Copy" and paste it in the `shadow.json` file

### config.json
```json
{
    "prefix": "!",
    "owners": ["IDs des propriétaires du bot"],
    "guildId": "id de serveur (si les commandes doivent êtres restreintes à certains serveurs)",
    "clientId" : "id du bot",
    "activityname": "statut à afficher, pour changer le type (joue, regarde, ...) rends toi dans index",
    "activityurl": "lien du bouton regarder (si l'activité est streaming)",
    "activitystatus": "état (online, idle, dnd, invisible)"
}

```
> prefix : Prefix for message commands

> owners : ID of the owner(s). They can use ALL commands of the bot, even if they have not the logical permissions.

> guildId : If you want to restrict commands to certain guilds, add the guilds IDs. Otherwise, leave as is.

> clientId : Id of the bot

> activityname : Activity (Example : Playing **Minecraft**)

> activityurl : If the bot is **STREAMING**, enter the link where people who click on “Watch” will be sent

> activitystatus : Bot status (online, away, do not disturb, or invisible). Unavailable if the bot is streaming.

## Additional: Slash commands
To deploy slash commands : 

1. Run `node deploy-commands.js`.
2. Reload your client
3. Run `node index.js`

Note : the commands for the Owners of the bot wont be deployed.

## Create a new command
```js
module.exports = {
    name: "//",
    description: "//",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        //
    },
    async executeSlash(client, interaction) {
        //
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}
```

> name : The name of the command

> description : The description of the command

> aliases : Other name you can use to execute command (NOT FOR SLASH COMMANDS)

> permissions : Permissions required to use the command

> guildOwnerOnly : Write `true` and only the owner of a guild will be able to use the command

> botOwnerOnly : Write `true` and only the owner(s) of the bot will be able to use the command


> async execute : Replace "//" by actions to do if the command is executed by message

> async executeSlash : Replace "//" by actions to do if the command is executed by slash

## Support
Join https://discord.gg/niridya to get support.