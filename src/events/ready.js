const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady, // Ini akan berisi string 'ready'
  once: true,
  execute(client) {
    console.log("-----------------------------------------");
    console.log(`🤖 STATUS: ONLINE!`);
    console.log(`✅ Masuk sebagai: ${client.user.tag}`);
    console.log("-----------------------------------------");
  },
};
