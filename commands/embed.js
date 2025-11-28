const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Envoie votre premier embed",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('Votre titre')
            .setDescription('Votre description')
            .setColor('Green') // Vous pouvez aussi mettre '#00ff00'
        message.reply({ embeds: [embed] }).catch(() => {});
    },
    async executeSlash(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Votre titre')
            .setDescription('Votre description')
            .setColor('Green') // Vous pouvez aussi mettre '#00ff00'
        interaction.reply({ embeds: [embed] }).catch(() => {});
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}