module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({
          content: "⚠️ Terjadi kesalahan saat menjalankan command.",
        });
      } else {
        await interaction.reply({
          content: "⚠️ Terjadi kesalahan saat menjalankan command.",
          ephemeral: true,
        });
      }
    }
  },
};
