const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((f) => f.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    client.on(event.name, (...args) => event.execute(...args));
  }

  console.log(`✅ Events loaded: ${eventFiles.length}`);
};
