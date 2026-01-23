const fs = require("fs");
const path = require("path");

module.exports = async (client, rest, Routes, clientId, guildId) => {
  const commands = [];
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // 🔥 VALIDASI WAJIB
    if (!command.data || !command.data.name || !command.data.description) {
      console.error(`❌ Command ${file} missing name or description`);
      continue;
    }

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  try {
    console.log("📦 Registering slash commands...");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
};
