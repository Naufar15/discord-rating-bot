require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// SERVER TETAP NYALA AGAR RENDER TIDAK SHUTDOWN
const app = express();
app.get("/", (req, res) => res.send("Bot Status: Checking..."));
app.listen(process.env.PORT || 3000, () => console.log("🌐 Web Server Ready"));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

// DEBUGGING LEVEL TINGGI
client.on("debug", (info) => console.log(`📡 [DEBUG]: ${info}`));
client.on("warn", (info) => console.log(`⚠️ [WARN]: ${info}`));
client.on("error", (error) => console.error(`❌ [ERROR]: ${error.message}`));

client.once("ready", () => {
  console.log("-----------------------------------------");
  console.log(`✅ BERHASIL ONLINE SEBAGAI: ${client.user.tag}`);
  console.log("-----------------------------------------");
});

console.log("🔍 Memulai proses login...");

// Proteksi jika login gantung lebih dari 15 detik
const loginTimeout = setTimeout(() => {
  console.log(
    "⏰ [TIMEOUT]: Login terlalu lama. Cek apakah Token sudah benar atau IP sedang diblokir.",
  );
}, 15000);

client
  .login(process.env.TOKEN)
  .then(() => clearTimeout(loginTimeout))
  .catch((err) => {
    clearTimeout(loginTimeout);
    console.error("❌ LOGIN GAGAL TOTAL:", err.message);
  });
