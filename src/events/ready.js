const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log("-----------------------------------------");
    console.log(`🤖 STATUS: ONLINE!`);
    console.log(`✅ Masuk sebagai: ${client.user.tag}`);
    console.log("-----------------------------------------");

    // ==========================================
    // ⚙️ PENGATURAN CUSTOM STATUS BOT
    // ==========================================
    client.user.setPresence({
      activities: [
        {
          name: "Custom Status",
          type: ActivityType.Custom, // Tipe status: Custom
          state: "Membuat preset yang mantep", // Teks yang akan muncul di profil bot
        },
      ],
      status: "idle", // Pilihan: 'online', 'idle', 'dnd', 'invisible'
    });
  },
};
