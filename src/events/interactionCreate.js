module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({
          content: "⚠️ Terjadi error saat menjalankan command.",
        });
      } else {
        await interaction.reply({
          content: "⚠️ Terjadi error saat menjalankan command.",
          ephemeral: true,
        });
      }
    }
  },
};
