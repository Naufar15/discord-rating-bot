const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const files = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter((f) => f.endsWith(".js"));

  for (const file of files) {
    const event = require(`../events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
  }
};
