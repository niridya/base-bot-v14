# base-bot-v14
Base bot for discord.js v14

## Introduction
This code is a sample optimized and organized bot using Discord.js v14, including Slash commands.

## Before use
- Install Node.js (>16)
- Install Visual Studio Code

## Installation
```sh
npm install
```

## Configuration
### shadow.json

```json
{
    "token": "Yout bot token"
}
```

### config.json
```json
{
    "prefix": "Your bot prefix (other than Slash commands)",
    "owners": ["User IDs for bot owners"]
}
```

## Additional: Slash commands
1. To register Slash commands for your bot, you need to configure two constants in `deploy-commands.js`
> clientId: Your bot ID

> (optional) guildId: Your guild ID (for guilds-only commands)

2. Run `node deploy-commands.js`.

## Support
Join https://discord.gg/antiraid to get support.
