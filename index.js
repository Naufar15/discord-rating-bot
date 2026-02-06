require("dotenv").config();
require("./src/server/keepAlive");

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

console.log("🚀 Bot starting...");

require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

client
  .login(process.env.TOKEN)
  .then(() => console.log("✅ Bot logged in"))
  .catch((err) => console.error("❌ Login failed:", err));
