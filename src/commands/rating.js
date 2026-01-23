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
    const allowedChannels = [
      "1424685610790293524",
      "1153267423517081632",
      "1153253123427680266",
    ];

    if (!allowedChannels.includes(interaction.channelId)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#ff4d4d")
            .setTitle("⚠️ Wrong Channel")
            .setDescription(
              "You can only use this command in the **approved rating channels**!",
            )
            .setFooter({ text: "Please switch to the correct channel 🙏" }),
        ],
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");
    const user = interaction.user;

    const stars = "⭐".repeat(starsCount);
    const defaultImage = "https://i.vgy.me/oeXaa7.png?cache=" + Date.now();

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("Customer Review")
      .setThumbnail("https://i.vgy.me/kZr5yI.png")
      .setDescription(
        "**Order Completed Successfully!** 🛒<a:Verify:1424709955805515849>",
      )
      .addFields(
        { name: "⭐ Rating:", value: stars },
        {
          name: "<a:amongus:1424709753426284576> Customer",
          value: `<@${user.id}>`,
        },
        {
          name: "<a:pixdreamsnani73:1424709901783011348> Comment",
          value: `\`\`\`${comment}\`\`\``,
        },
      )
      .setImage(defaultImage)
      .setFooter({
        text: `Reviewed by: ${user.username} • ${new Date().toLocaleTimeString()}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
