const { Client, Collection, GatewayIntentBits: Intents, Partials, ActivityType } = require("discord.js");
const fs = require("fs");
const colors = require("colors");

const client = new Client({
    intents: [
        Intents.AutoModerationConfiguration,
        Intents.AutoModerationExecution,
        Intents.DirectMessageReactions,
        Intents.DirectMessageReactions,
        Intents.DirectMessages,
        Intents.GuildEmojisAndStickers,
        Intents.GuildEmojisAndStickers,
        Intents.GuildInvites,
        Intents.GuildMembers,
        Intents.GuildMessageReactions,
        Intents.GuildMessageTyping,
        Intents.GuildMessages,
        Intents.GuildMessages,
        Intents.GuildPresences,
        Intents.GuildScheduledEvents,
        Intents.GuildVoiceStates,
        Intents.GuildVoiceStates,
        Intents.Guilds,
        Intents.MessageContent,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {
        activities: [{
            name: `choisis ton statut.`,
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/niridya"
        }],
        status: "online"
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});
client.config = require("./config.json");
client.shadow = require("./shadow.json");

client.login(client.shadow.token);

// chargement des events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// chargement des commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// gestion des erreurs
process.on("unhandledRejection", (error) => {
    // erreurs ignorées
    if (error.code == 10062) return; // Unknown interaction

    console.log(`[ERROR] ${error}`.red);
})
