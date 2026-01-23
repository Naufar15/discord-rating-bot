const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ALLOWED_RATING_CHANNELS } = require("../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Give a rating")
    .addIntegerOption((o) =>
      o.setName("stars").setMinValue(1).setMaxValue(5).setRequired(true),
    )
    .addStringOption((o) => o.setName("comment").setRequired(true)),

  async execute(interaction) {
    if (!ALLOWED_RATING_CHANNELS.includes(interaction.channelId)) {
      return interaction.reply({
        content: "❌ Wrong channel.",
        ephemeral: true,
      });
    }

    const stars = "⭐".repeat(interaction.options.getInteger("stars"));
    const comment = interaction.options.getString("comment");

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("Customer Review")
      .addFields(
        { name: "Rating", value: stars },
        { name: "Comment", value: `\`\`\`${comment}\`\`\`` },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
