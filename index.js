require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("🚀 Bot starting...");

// === WEB SERVER WAJIB NYALA CEPAT ===
require("./src/server/keepAlive");

// === DISCORD CLIENT ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();

// handlers
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

// login
client
  .login(process.env.TOKEN)
  .then(() => console.log("🤖 Bot online"))
  .catch((err) => console.error("❌ LOGIN FAILED:", err));
