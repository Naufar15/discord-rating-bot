const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate, // Menggunakan konstanta resmi
  async execute(interaction) {
    // Log ini WAJIB muncul di Render kalau kamu ngetik command di Discord
    console.log(
      `📩 Interaksi diterima: /${interaction.commandName} dari ${interaction.user.tag}`,
    );

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `❌ Command ${interaction.commandName} tidak terdaftar di client.commands`,
      );
      return;
    }

    try {
      await command.execute(interaction);
      console.log(
        `✅ Berhasil menjalankan command: /${interaction.commandName}`,
      );
    } catch (error) {
      console.error(
        `❌ Error saat mengeksekusi ${interaction.commandName}:`,
        error,
      );

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Terjadi error!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({ content: "Terjadi error!", ephemeral: true });
      }
    }
  },
};
