require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

// 🚀 WAJIB JALAN DULU
require("./src/server/keepAlive");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.User, Partials.GuildMember],
});

client.commands = new Collection();

// handlers
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

client.login(process.env.TOKEN);
