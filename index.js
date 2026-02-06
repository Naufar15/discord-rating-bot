require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.User, Partials.GuildMember],
});

// WAJIB
client.commands = new Collection();

require("./src/server/keepAlive");
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

client.login(process.env.TOKEN);
