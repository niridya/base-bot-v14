const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');

const shadow = require("./shadow.json");
const guildId = "id de serveur pour les commandes de serveur";
const clientId = "id du bot";

const commands = [];

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith(".js"));
commandFiles.forEach(commandFile => {
    const command = require(`${__dirname}/commands/${commandFile}`);
    if (command.data && !command.botOwnerOnly) commands.push(command.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(shadow.token);

rest.put(
    // Routes.applicationGuildCommands(clientId, guildId), { body: commands } // Guild commands
    Routes.applicationCommands(clientId), { body: commands } // Global commands
    )
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);