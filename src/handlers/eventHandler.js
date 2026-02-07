const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    // DEBUG: Cek apakah nama event terbaca
    console.log(`   📂 Loading event: ${file} (Name: ${event.name})`);

    if (!event.name) {
      console.error(
        `   ❌ Error: File ${file} tidak memiliki properti 'name'!`,
      );
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
  console.log(`✅ Events loaded: ${eventFiles.length}`);
};
