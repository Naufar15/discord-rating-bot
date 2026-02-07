const { REST, Routes } = require("discord.js");

module.exports = async (client) => {
  // ... (kode loading command kamu di sini) ...
  const commandsArray = client.commands.map((cmd) => cmd.data.toJSON());

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("🔄 Memulai Sinkronisasi Command ke Guild...");

    // GUNAKAN applicationGuildCommands agar update INSTAN (tanpa nunggu 1 jam)
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commandsArray },
    );

    console.log("✅ Command Berhasil Diperbarui di Server!");
  } catch (error) {
    console.error("❌ Gagal sinkronisasi command:", error);
  }
};
