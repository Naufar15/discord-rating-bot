// src/commands/rating.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Give a rating and comment!")
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Select 1-5 stars")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5),
    )
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Write your feedback")
        .setRequired(true),
    ),

  async execute(interaction) {
    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");
    const stars = "⭐".repeat(starsCount);

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("Customer Review")
      .setThumbnail(interaction.user.displayAvatarURL())
      .setDescription("**Order Completed Successfully!** 🛒")
      .addFields(
        { name: "⭐ Rating:", value: stars },
        { name: "👤 Customer", value: `<@${interaction.user.id}>` },
        { name: "💬 Comment", value: comment },
      )
      .setTimestamp()
      .setFooter({ text: `Reviewed by: ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};
