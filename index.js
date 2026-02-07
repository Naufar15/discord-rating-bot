require("dotenv").config();
// BARIS DI BAWAH INI WAJIB ADA:
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("1. Memulai Inisialisasi...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences, // Agar fitur Boost jalan
  ],
});

client.commands = new Collection();

console.log("2. Memuat Server...");
try {
  require("./src/server/keepAlive");
} catch (err) {
  console.error("❌ Gagal memuat keepAlive:", err.message);
}

console.log("3. Memuat Handlers...");
try {
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);
  console.log("   ✅ Handlers loaded");
} catch (err) {
  console.error("❌ ERROR SAAT LOAD HANDLER:", err);
}

console.log("4. Mencoba Login...");
client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("🤖 Bot online & connected to Discord!");
  })
  .catch((err) => {
    console.error("❌ LOGIN FAILED:", err.message);
  });
