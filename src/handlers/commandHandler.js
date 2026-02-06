const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`${commandPath}/${file}`);

    if (!command.data || !command.execute) continue;

    client.commands.set(command.data.name, command);
  }

  console.log(`✅ Loaded ${client.commands.size} commands`);
};
