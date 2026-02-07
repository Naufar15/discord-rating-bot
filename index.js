// index.js (Bagian tengah)
client.commands = new Collection();

// Memuat handler
require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Bot is Live!"));
app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
  ],
  // Partials membantu bot menerima data meskipun datanya tidak lengkap (cache kosong)
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
  ],
  shards: "auto", // Membantu koneksi lebih stabil
});

// DEBUGGING LOGS
client.on("debug", (info) => console.log(`📡 [DEBUG]: ${info}`));
client.on("error", (err) => console.error(`❌ [ERROR]: ${err.message}`));

client.once("ready", () => {
  console.log("-----------------------------------------");
  console.log(`✅ BOT ONLINE: ${client.user.tag}`);
  console.log("-----------------------------------------");
});

console.log("🔍 Memulai koneksi ke Discord...");

client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ GAGAL LOGIN:", err.message);
});
