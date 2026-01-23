// === Load environment ===
require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

// === Create Discord Client ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.User, Partials.GuildMember],
});

// 🔥 INI YANG KURANG SELAMA INI
client.commands = new Collection();

// === Keep Alive Server ===
require("./src/server/keepAlive");

// === Load Handlers ===
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

// === Login Bot ===
client.login(process.env.TOKEN);
