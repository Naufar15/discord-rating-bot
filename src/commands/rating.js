const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Submit your feedback and rating for our service!") // Terjemahan
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Select a rating (1-5 stars)") // Terjemahan
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5),
    )
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Write your review or feedback here") // Terjemahan
        .setRequired(true),
    ),

  async execute(interaction) {
    // Ambil data inputan user
    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");

    // Generate string bintang (Contoh: ⭐⭐⭐⭐⭐)
    const stars = "<:Star:1469717334930358412>".repeat(starsCount);

    // --- 🖼️ IMAGE CONFIGURATION ---
    const logoUrl = "https://i.vgy.me/kZr5yI.png"; // Logo Toko (Kanan Atas)
    const bannerUrl = "https://i.vgy.me/oeXaa7.png"; // Banner Besar (Bawah)
    // -----------------------------

    const embed = new EmbedBuilder()
      .setColor("#FFA0A0")
      .setTitle("Customer Review") // Judul
      .setThumbnail(logoUrl)
      .setDescription(
        "**Order Completed Successfully!** 🛒<a:Verify:1424709955805515849>",
      ) // Deskripsi
      .addFields(
        {
          name: "<:Star:1469717334930358412> Rating:",
          value: `${stars}`,
          inline: false,
        },
        {
          name: "<a:amongus:1424709753426284576> Customer",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
        {
          name: "<a:pixdreamsnani73:1424709901783011348> Comment",
          value: `\`\`\`${comment}\`\`\``,
          inline: false,
        },
      )
      .setImage(bannerUrl)
      .setTimestamp()
      .setFooter({
        text: `Reviewed by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
