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

// load handlers
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

// LOGIN DULU
client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("🤖 Bot online");

    // BARU nyalain web server
    require("./src/server/keepAlive");
  })
  .catch((err) => {
    console.error("❌ LOGIN FAILED:", err);
  });
