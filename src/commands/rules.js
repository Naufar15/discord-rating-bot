const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Send the server rules embed"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📜 Server Rules")
      .setDescription(
        "1. Be respectful\n" +
          "2. No spam\n" +
          "3. No NSFW content\n" +
          "4. Follow Discord TOS",
      )
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
  },
};
