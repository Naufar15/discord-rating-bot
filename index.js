console.log("1. Memulai Inisialisasi...");

// Pastikan Intent lengkap
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences, // Wajib untuk boost
  ],
});

console.log("2. Memuat Server...");
require("./src/server/keepAlive");

console.log("3. Memuat Handlers...");
try {
  require("./src/handlers/commandHandler")(client);
  console.log("   - Command Handler OK");
  require("./src/handlers/eventHandler")(client);
  console.log("   - Event Handler OK");
} catch (err) {
  console.error("❌ ERROR SAAT LOAD HANDLER:", err);
}

console.log("4. Mencoba Login...");
client
  .login(process.env.TOKEN)
  .then(() => console.log("🤖 Bot online & connected!"))
  .catch((err) => console.error("❌ LOGIN FAILED:", err));
