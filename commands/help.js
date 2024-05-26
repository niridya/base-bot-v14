const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "help",
    description: "Afficher l'aide du bot.",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        let helpMessage = `> :vibration_mode: **Liste des commande de <@${client.user.id}>** :\n\n`;
        client.commands.forEach(command => {
            helpMessage += `> :robot: Nom de la commande : **${command.name}**\n> :newspaper: Description : **${command.description}**\n\n`;
        });
        message.reply(helpMessage).catch(() => {});
    },
    async executeSlash(client, interaction) {
        let helpMessage = "> :vibration_mode: **Liste des commande de <@${client.user.id}>** :\n\n";
        client.commands.forEach(command => {
            helpMessage += `> :robot: Nom de la commande : **${command.name}**\n> :newspaper: Description : **${command.description}**\n\n`;
        });
        interaction.reply(helpMessage).catch(() => {});
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}

