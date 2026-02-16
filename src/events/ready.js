const { Events } = require("discord.js");

module.exports = {
  // Ganti 'ready' menjadi Events.ClientReady
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log("-----------------------------------------");
    console.log(`🤖 STATUS: ONLINE!`);
    console.log(`✅ Masuk sebagai: ${client.user.tag}`);
    console.log(`🟢 Lingkaran hijau aktif di Discord.`);
    console.log("-----------------------------------------");
  },
};
