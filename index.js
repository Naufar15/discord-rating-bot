require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Bot is Running!"));
app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

// EVENT SEDERHANA LANGSUNG DI SINI
client.once("ready", () => {
  console.log("-----------------------------------------");
  console.log(`🤖 FAKTANYA BOT ONLINE SEBAGAI: ${client.user.tag}`);
  console.log("-----------------------------------------");
});

// DETEKSI ERROR KONEKSI
client.on("error", (error) => console.error("❌ DISCORD ERROR:", error));

console.log("🔍 Mencoba login...");
client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ GAGAL LOGIN TOTAL:", err.message);
});
