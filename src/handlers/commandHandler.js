// Di dalam commandHandler.js setelah loop loading command
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Memperbarui Guild Commands...");
    await rest.put(
      // applicationGuildCommands membuat update INSTAN (tanpa nunggu 1 jam)
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: client.commands.map((cmd) => cmd.data.toJSON()) },
    );
    console.log("✅ Guild Commands Sinkron!");
  } catch (error) {
    console.error("❌ Gagal sinkronisasi:", error);
  }
})();
