// src/events/interactionCreate.js
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error pada command ${interaction.commandName}:`, error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Ada error saat menjalankan perintah ini!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Ada error saat menjalankan perintah ini!",
          ephemeral: true,
        });
      }
    }
  },
};
