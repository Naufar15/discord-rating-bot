require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// ===============================================================
// 🤖 DISCORD CLIENT SETUP (Murni Tanpa Web Server)
// ===============================================================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Debugging
client.on("debug", (info) => {
  // Tampilkan log kalau ada error koneksi saja
  if (info.includes("401") || info.includes("Hit rate limit")) {
    console.log(`🚨 [DISCORD ERROR]: ${info}`);
  }
});

// ===============================================================
// 📦 LOAD HANDLERS
// ===============================================================
console.log("🚀 --- BOOTING START ---");
try {
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);
  console.log("✅ Handlers Loaded");
} catch (err) {
  console.error("❌ Error loading handlers:", err);
}

// ===============================================================
// 🔑 LOGIN
// ===============================================================
const token = process.env.TOKEN;

if (!token) {
  console.error("❌ ERROR: Token tidak ditemukan di Environment Variables!");
  process.exit(1);
}

client
  .login(token)
  .then(() => console.log("🤖 Login Berhasil! Bot siap digunakan."))
  .catch((err) => console.error("❌ Gagal Login:", err));

// Anti Crash
process.on("unhandledRejection", (error) => {
  console.error("⚠️ Unhandled Error:", error);
});
