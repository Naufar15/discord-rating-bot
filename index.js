require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("🚀 --- DEBUG MODE START ---");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

// LOG DEBUG MENTAH (Sangat Penting!)
client.on("debug", (info) => {
  console.log(`📡 [DISCORD DEBUG]: ${info}`);
});

client.commands = new Collection();

// 1. Web Server
require("./src/server/keepAlive");

// 2. Handlers
try {
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);
} catch (err) {
  console.error("❌ Handler Error:", err);
}

// 3. Login dengan Catch Error yang lebih detail
const token = process.env.TOKEN;

console.log(`🔍 Checking Token: ${token ? "Terbaca" : "KOSONG"}`);

client
  .login(token)
  .then(() => console.log("✅ Fungsi client.login() berhasil dipanggil."))
  .catch((err) => {
    console.error("❌ GAGAL TOTAL SAAT LOGIN:");
    console.error(`Pesan: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
  });

// Deteksi jika bot terkena Rate Limit atau koneksi terputus
client.on("error", (err) => console.error("📡 [CONNECTION ERROR]:", err));
client.on("shardError", (err) => console.error("📡 [SHARD ERROR]:", err));
