const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    // Mengambil command dari collection yang di-set di index.js
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`❌ Command /${interaction.commandName} tidak ditemukan.`);
      return;
    }

    try {
      await command.execute(interaction);
      console.log(
        `📡 [INTERACTION]: Berhasil menjalankan /${interaction.commandName}`,
      );
    } catch (error) {
      console.error(`❌ Error pada /${interaction.commandName}:`, error);
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
