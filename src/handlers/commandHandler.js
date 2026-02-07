const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Memperbarui Command khusus untuk server ini...");
    await rest.put(
      // Menggunakan applicationGuildCommands agar update INSTAN di server spesifik
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commandsArray }, // commandsArray adalah kumpulan data command kamu
    );
    console.log("✅ Command sinkron tanpa perlu re-invite!");
  } catch (error) {
    console.error("❌ Gagal sinkronisas:", error);
  }
})();
