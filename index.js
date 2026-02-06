require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("🚀 Bot starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();

// keep web service alive (WAJIB BUAT RENDER)
require("./src/server/keepAlive");

// load handlers
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

console.log("TOKEN:", process.env.TOKEN ? "ADA" : "KOSONG");

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("🤖 Bot online & connected to Discord");
  })
  .catch((err) => {
    console.error("❌ LOGIN FAILED FULL:", err);
  });
