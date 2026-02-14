require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const express = require("express");

// ===============================================================
// 🌐 1. WEB SERVER (Agar Render tidak mematikan bot)
// ===============================================================
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Bot NANONANO is Online & Ready!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web Server running on port ${PORT}`);
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

// Buat koleksi command
client.commands = new Collection();

// ===============================================================
// 📦 3. LOAD HANDLERS
// ===============================================================
console.log("🚀 --- MEMULAI PROSES BOOTING ---");

// Debugging Koneksi
client.on("debug", (info) => {
  // Hanya tampilkan log penting biar tidak nyepam
  if (info.includes("Heartbeat") || info.includes("Identify")) {
    console.log(`📡 [DEBUG]: ${info}`);
  }
});

try {
  console.log("📦 Memuat Handlers...");
  // Pastikan path folder ini BENAR sesuai struktur foldermu
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);
  console.log("✅ Handlers berhasil diinisialisasi");
} catch (err) {
  console.error("❌ CRITICAL ERROR saat memuat handler:", err);
}

// ===============================================================
// 🔄 4. AUTO-REFRESH SYSTEM (Anti-Zombie Connection)
// ===============================================================
// Bot akan restart otomatis setiap 6 jam untuk menyegarkan koneksi
const RESTART_INTERVAL = 6 * 60 * 60 * 1000; // 6 Jam

setTimeout(() => {
  console.log("⏰ [AUTO-REFRESH] Waktunya restart rutin...");
  process.exit(1); // Memaksa Render untuk menyalakan ulang bot
}, RESTART_INTERVAL);

console.log(`🕒 Auto-Refresh Timer: Aktif (Restart tiap 6 jam)`);

// ===============================================================
// 🔑 5. LOGIN KE DISCORD
// ===============================================================
const token = process.env.TOKEN;

if (!token) {
  console.error("❌ ERROR: Token tidak ditemukan di .env!");
  process.exit(1);
}

client
  .login(token)
  .then(() => console.log("🤖 Sedang login ke Discord..."))
  .catch((err) => console.error("❌ GAGAL LOGIN:", err));

// Mencegah bot mati mendadak karena error kecil
process.on("unhandledRejection", (error) => {
  console.error("⚠️ Unhandled Promise Rejection:", error);
});
