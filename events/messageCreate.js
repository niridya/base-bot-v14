const { Client, Message } = require("discord.js")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client 
     * @param {Message} message 
     */
    async execute(client, message) {
        if (message.channel.isDMBased() || message.author.bot) return;
        if (!message.content.startsWith(client.config.prefix)) return;

        // ANALYSEUR DE COMMANDES
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // check commande
        const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
        if (!command) return;

        // botOwnerOnly
        const isBotOwner = client.config.owners.includes(message.author.id);
        if (command.permissions && command.botOwnerOnly && !isBotOwner) return message.reply("Vous devez être le propriétaire du bot pour exécuter cette commande.").catch(() => {});

        // guildOwnerOnly
        const isGuildOwner = message.guild.ownerId == message.author.id;
        if (command.permissions && command.guildOwnerOnly && !isBotOwner && !isBotOwner) return message.reply("Vous devez être le propriétaire du serveur pour exécuter cette commande.").catch(() => {});

        // permissions
        const authorPerms = message.channel.permissionsFor(message.author);
        const hasPerms = authorPerms && authorPerms.has(command.permissions);
        if (!hasPerms && !isBotOwner) return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.").catch(() => {});

        command.execute(client, message, args);
        console.log(`[CMD]`.brightBlue + ` ${message.guild.name} | ${message.channel.name} | ${message.author.tag} | ${command.name}`);
    }
}