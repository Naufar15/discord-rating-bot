const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Give a rating and comment!")
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Select number of stars (1–5)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5),
    )
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Write your feedback or review")
        .setRequired(true),
    ),

  async execute(interaction) {
    const stars = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("⭐ New Rating")
      .addFields(
        { name: "Stars", value: "⭐".repeat(stars), inline: true },
        { name: "Comment", value: comment },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
