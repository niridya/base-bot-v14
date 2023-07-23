const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(client, interaction) {
        if (!interaction.guild) return;
        if (!interaction.isChatInputCommand()) return;
        
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        // botOwnerOnly
        const isBotOwner = client.config.owners.includes(interaction.user.id);
        if (command.permissions && command.botOwnerOnly && !isBotOwner) return interaction.reply({ content: `❌ **Vous devez être le propriétaire du bot pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
            
        // guildOwnerOnly
        const isGuildOwner = interaction.member.guild.ownerId == interaction.user.id;
        if (command.permissions && command.guildOwnerOnly && !isBotOwner && !isGuildOwner) return interaction.reply({ content: `❌ **Vous devez être le propriétaire du serveur pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
            
        // permissions
        const authorPerms = interaction.guild.channels.cache.get(interaction.channelId).permissionsFor(interaction.user);
        const hasPerms = authorPerms && authorPerms.has(command.permissions);
        if (!hasPerms && !isBotOwner) return interaction.reply({ content: `❌ **Vous n'avez pas les permissions nécessaires pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});


        command.executeSlash(client, interaction);
        console.log(`[CMD-S]`.brightBlue + ` ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${command.name}`);
        
    }
}