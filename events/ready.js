module.exports = {
    name: "clientReady",
    once: true,
    async execute(client) {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) est prêt | ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('fr-FR')} utilisateurs`.green);

        // mise à jour des commandes Slash
        await client.application.commands.fetch();
        client.commands.filter(command => command.data && !command.botOwnerOnly).forEach(command => {
            if (client.application.commands.cache.find(c => c.name == command.name && !c.guildId)) {
                client.application.commands.cache.find(c => c.name == command.name && !c.guildId)?.edit(command.data);
            } else {
                client.application.commands.create(command.data);
            };
        });
        client.application.commands.cache.filter(c => !client.commands.find(cmd => cmd.name == c.name)).map(c => c.delete());
    }
}