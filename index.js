require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("🚀 --- MEMULAI BOT ---");

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

// 1. Web Server (Langsung di index agar tidak error path)
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("✅ Bot is Alive!"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌐 Server Keep-Alive Nyala"),
);

// 2. Load Handlers dengan pengecekan ekstra
try {
  console.log("📦 Loading Handlers...");
  // Pastikan folder 'src/handlers' ada dan nama file benar
  const cmdHandler = require("./src/handlers/commandHandler");
  const evntHandler = require("./src/handlers/eventHandler");

  cmdHandler(client);
  evntHandler(client);
} catch (err) {
  console.error("❌ Gagal load handler:", err.message);
}

// 3. Login
const token = process.env.TOKEN;
if (!token) {
  console.error("❌ TOKEN KOSONG! Cek Environment Variables di Render.");
} else {
  client
    .login(token)
    .then(() => console.log("🤖 Login berhasil diproses..."))
    .catch((err) => console.error("❌ Login gagal:", err.message));
}

// Error handling agar tidak crash total
process.on("unhandledRejection", (error) =>
  console.error("Unhandled promise rejection:", error),
);
