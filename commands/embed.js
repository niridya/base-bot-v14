const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Envoie votre premier embed",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle("Votre titre")
            .setDescription("Votre description")
            .setColor(Colors.Green) // Vous pouvez aussi utiliser "#00ff00"
        message.reply({ embeds: [embed] }).catch(() => {});
    },
    async executeSlash(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Votre titre")
            .setDescription("Votre description")
            .setColor(Colors.Green) // Vous pouvez aussi utiliser "#00ff00"
        interaction.reply({ embeds: [embed] }).catch(() => {});
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}