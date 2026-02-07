const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate, // Menggunakan konstanta resmi
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    // Mengambil command dari client
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`❌ Command ${interaction.commandName} tidak ditemukan.`);
      return;
    }

    try {
      await command.execute(interaction);
      console.log(
        `✅ Command /${interaction.commandName} berhasil dijalankan oleh ${interaction.user.tag}`,
      );
    } catch (error) {
      console.error(`❌ Error menjalankan /${interaction.commandName}:`, error);

      const errorMessage = {
        content: "Terjadi error saat menjalankan command!",
        ephemeral: true,
      };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  },
};
