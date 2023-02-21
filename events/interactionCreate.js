const { InteractionType } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.guild) return;

        if (interaction.type == InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            // check permissions
            if (command.permissions) {
                if (command.botOwnerOnly) {
                    if (!client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `❌ **Vous devez être le propriétaire du bot pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
                }

                if (command.guildOwnerOnly) {
                    if (interaction.member.guild.ownerId != interaction.user.id && !client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `❌ **Vous devez être le propriétaire du serveur pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
                }

                const authorPerms = interaction.guild.channels.cache.get(interaction.channelId).permissionsFor(interaction.user);
                if ((!authorPerms || !authorPerms.has(command.permissions)) && !client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: `❌ **Vous n'avez pas les permissions nécessaires pour exécuter cette commande.**`, ephemeral: true }).catch(() => {});
            }

            command.executeSlash(client, interaction);
            console.log(`[CMD-S]`.brightBlue + ` ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${command.name}`);
        }
    }
}