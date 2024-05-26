const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const colors = require("colors");
const fs = require("fs");
const { config } = require("process");

const configfile = require("./config.json");
const shadow = require("./shadow.json");

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
    partials: [ Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {
        activities: [{
            name: configfile.activityname,
            type: ActivityType.Playing,
            url: configfile.activityurl
        }],
        status: configfile.activitystatus
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});

// ajout des propriétés
client.config = require("./config.json");
client.shadow = require("./shadow.json");

// connexion à Discord
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
};

// chargement des commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// gestion des erreurs
async function errorHandler(error) {
    // erreurs ignorées
    if (error.code == 10062) return; // Unknown interaction
    if (error.code == 40060) return; // Interaction has already been acknowledged

    console.log(`[ERROR] ${error}`.red);
};
process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);