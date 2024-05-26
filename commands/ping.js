const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Afficher le ping du bot.",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        message.reply(`> 🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => {});
    },
    async executeSlash(client, interaction) {
        interaction.reply(`> 🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => {});
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}