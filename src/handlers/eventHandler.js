const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);

    if (!event.name || !event.execute) {
      console.log(`⚠️ Event ${file} invalid`);
      continue;
    }

    client.on(event.name, (...args) => event.execute(...args, client));
  }

  console.log(`✅ Loaded ${eventFiles.length} events`);
};
