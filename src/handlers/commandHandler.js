const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (!command.data || !command.execute) {
      console.log(`⚠️ Command ${file} tidak valid`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }

  console.log(`✅ Loaded ${client.commands.size} commands`);
};
