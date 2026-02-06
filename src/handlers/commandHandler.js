const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandPath, file));
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }

  console.log("✅ Commands loaded:", client.commands.size);
};
