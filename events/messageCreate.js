module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (!message.inGuild() || message.author.bot) return;

        // traitement du préfixe
        if (!message.content.startsWith(client.config.prefix)) return;

        // récupération de la commande
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
        if (!command || !command.execute) return;

        // vérification des permissions
        if (command.botOwnerOnly) {
            if (!client.config.owners.includes(message.author.id)) return;
        };

        if (command.guildOwnerOnly) {
            if (message.guild.ownerId != message.author.id && !client.config.owners.includes(message.author.id)) return message.reply("Vous devez être le propriétaire du serveur pour exécuter cette commande.").catch(() => {});
        };

        if (command.permissions?.length) {
            const authorPerms = message.channel.permissionsFor(message.author) || message.member.permissions;
            if (!authorPerms.has(command.permissions) && !client.config.owners.includes(message.author.id)) return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.").catch(() => {});
        };

        command.execute(client, message, args);
        console.log("[CMD]".blue, `${message.guild.name} | ${message.channel.name} | ${message.author.tag} | ${command.name}`);
    }
}