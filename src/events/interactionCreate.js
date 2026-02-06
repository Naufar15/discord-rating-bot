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

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "❌ Terjadi error saat menjalankan command.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "❌ Terjadi error saat menjalankan command.",
          ephemeral: true,
        });
      }
    }
  },
};
