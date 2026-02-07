const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
  // Pastikan path ini menunjuk ke folder yang BENAR
  const commandsPath = path.join(__dirname, "../commands");

  // Cek apakah folder commands ada?
  if (!fs.existsSync(commandsPath)) {
    console.error(
      `❌ ERROR FATAL: Folder commands tidak ditemukan di: ${commandsPath}`,
    );
    return;
  }

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  const commandsArray = [];

  if (commandFiles.length === 0) {
    console.warn(
      "⚠️ PERINGATAN: Folder commands ditemukan tapi KOSONG (tidak ada file .js)!",
    );
    return;
  }

  console.log(`📂 Membaca ${commandFiles.length} file command...`);

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Cek apakah file command punya struktur yang benar (data & execute)
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      commandsArray.push(command.data.toJSON());
      console.log(`   ✅ Loaded Command: /${command.data.name}`);
    } else {
      console.log(
        `   ⚠️ Lewati file ${file}: Kurang properti 'data' atau 'execute'.`,
      );
    }
  }

  // PENGAMAN: Jangan update ke Discord kalau array kosong!
  if (commandsArray.length === 0) {
    console.error(
      "❌ STOP: Tidak ada command valid yang dimuat. Membatalkan update ke Discord agar command tidak hilang.",
    );
    return;
  }

  // Proses Upload ke Discord
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log(
      `🔄 Mengirim ${commandsArray.length} command ke Server (Guild)...`,
    );

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commandsArray },
    );

    console.log("✨ SUKSES: Command berhasil didaftarkan ulang!");
  } catch (error) {
    console.error("❌ Gagal mendaftarkan command:", error);
  }
};
