// src/events/ready.js
module.exports = {
  name: "ready", // Kita pakai string manual agar tidak terjadi mismatch 'clientReady'
  once: true,
  execute(client) {
    console.log("-----------------------------------------");
    console.log(`🤖 STATUS: ONLINE!`);
    console.log(`✅ Masuk sebagai: ${client.user.tag}`);
    console.log("🟢 Lingkaran hijau aktif di Discord.");
    console.log("-----------------------------------------");
  },
};
