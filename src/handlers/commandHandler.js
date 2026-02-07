// src/handlers/commandHandler.js
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  const commandsArray = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      commandsArray.push(command.data.toJSON());
      console.log(`   📂 Loaded Command: ${file}`);
    }
  }

  // Mendaftarkan Slash Command ke Discord API secara otomatis
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      console.log("🔄 Memperbarui Slash Commands di Discord...");
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commandsArray,
      });
      console.log("✅ Slash Commands berhasil didaftarkan!");
    } catch (error) {
      console.error("❌ Gagal mendaftarkan Slash Commands:", error);
    }
  })();
};
