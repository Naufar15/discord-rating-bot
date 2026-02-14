require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const express = require("express");

// 1. Inisialisasi Express (Web Server agar Render tetap 'Live')
const app = express();
app.get("/", (req, res) => res.send("✅ Bot NANONANO is Online!"));
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Web Server listening on port 3000");
});

// 2. Inisialisasi Client Discord (Wajib di atas sebelum memanggil client.commands)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

// 3. Inisialisasi Collection untuk Commands
client.commands = new Collection();

// 4. Debug Mode (Melihat komunikasi mentah dengan Discord)
client.on("debug", (info) => {
  if (info.includes("Heartbeat") || info.includes("Identify")) {
    console.log(`📡 [DEBUG]: ${info}`);
  }
});

// 5. Memuat Handlers (Pastikan folder dan file ini ada di project kamu)
console.log("🚀 --- MEMULAI PROSES BOOTING ---");
try {
  console.log("📦 1. Memuat Handlers...");
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);
  console.log("✅ Handlers berhasil diinisialisasi");
} catch (err) {
  console.error("❌ Gagal memuat handler:", err.message);
}

// 6. Login ke Discord
const token = process.env.TOKEN;
console.log(`🔍 2. Mengecek Token: ${token ? "Terbaca" : "KOSONG"}`);

client
  .login(token)
  .then(() => {
    console.log("🤖 Proses login ke Discord dimulai...");
  })
  .catch((err) => {
    console.error("❌ GAGAL LOGIN:");
    console.error(err.message);
  });

// 7. Error Handling Global agar tidak crash mendadak
process.on("unhandledRejection", (error) => {
  console.error("⚠️ Unhandled promise rejection:", error);
});

// ===============================================================
// 🔄 AUTO-REFRESH SYSTEM (Anti-Zombie Connection)
// ===============================================================
// Bot akan mematikan dirinya sendiri setiap 6 jam.
// Render akan otomatis me-restart bot ini kembali dalam detik.
// Ini memastikan koneksi ke Discord selalu "segar" dan tidak nyangkut.

const RESTART_INTERVAL = 6 * 60 * 60 * 1000; // 6 Jam dalam milidetik

setInterval(() => {
  console.log(
    "⏰ [AUTO-REFRESH] Waktunya merestart koneksi agar tidak lemot...",
  );
  process.exit(1); // Mematikan proses dengan kode 1 (Force Exit)
}, RESTART_INTERVAL);

console.log(`🕒 Auto-Refresh timer dipasang: Bot akan restart setiap 6 jam.`);
