const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) est prêt | ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('fr-FR')} utilisateurs`.green);

        // Mise à jour des commandes globales
        const globalApplicationCommands = client.commands.filter(command => command.data).map(command => command.data);
        await client.application.commands.set(globalApplicationCommands);
    }
}