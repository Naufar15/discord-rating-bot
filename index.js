require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.User, Partials.GuildMember],
});

client.commands = new Collection();

// keep alive
require("./src/server/keepAlive");

// handlers
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

client.login(process.env.TOKEN);
