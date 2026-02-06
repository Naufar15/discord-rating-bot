require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const loadCommands = require("./src/handlers/commandHandler");
const loadEvents = require("./src/handlers/eventHandler");

// 🔥 INI YANG PENTING
require("./src/server/keepAlive");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);
