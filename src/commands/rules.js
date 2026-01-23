const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Send server rules"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#FFA6A6")
      .setTitle("📘 Rules & Guidelines")
      .setDescription("Isi rules kamu di sini...")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
