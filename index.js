require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const express = require("express"); // Panggil Express lagi

// ===============================================================
// 🌐 1. WEB SERVER "PANCINGAN" (Agar Railway Tidak Mematikan Bot)
// ===============================================================
const app = express();
const PORT = process.env.PORT || 3000; // Railway otomatis isi PORT ini

app.get("/", (req, res) => {
  res.send("✅ Bot NANONANO is Running on Railway!");
});

app.listen(PORT, () => {
  console.log(`🌐 Web Server listening on port ${PORT}`);
});

// ===============================================================
// 🤖 2. DISCORD CLIENT SETUP
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

// Debugging Error
client.on("debug", (info) => {
  if (info.includes("401") || info.includes("Hit rate limit")) {
    console.log(`🚨 [DISCORD ERROR]: ${info}`);
  }
});

// ===============================================================
// 📦 3. LOAD HANDLERS
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
// 🔑 4. LOGIN
// ===============================================================
const token = process.env.TOKEN;

if (!token) {
  console.error("❌ ERROR: Token tidak ditemukan!");
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
