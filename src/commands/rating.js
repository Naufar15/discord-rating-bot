const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Write your feedback!")
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
        .setDescription("Write your comment and feedback")
        .setRequired(true),
    ),

  async execute(interaction) {
    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");
    const stars = "⭐".repeat(starsCount);

    // --- 🖼️ AREA EDIT GAMBAR (GANTI LINK INI) ---
    // 1. Link untuk Logo di kanan atas (Thumbnail)
    const logoUrl = "https://i.vgy.me/kZr5yI.png"; // Ganti dengan URL logo tokomu

    // 2. Link untuk Banner Besar di bawah
    const bannerUrl = "https://i.vgy.me/oeXaa7.png"; // Ganti dengan URL bannermu
    // ----------------------------------------------

    const embed = new EmbedBuilder()
      .setColor("#00AEEF") // Warna garis biru samping
      .setTitle("Customer Review")
      .setThumbnail(logoUrl) // Logo toko di pojok kanan atas
      .setDescription("**Order Completed Successfully!** 🛒✅") // Tambah centang hijau
      .addFields(
        { name: "⭐ Rating:", value: stars, inline: false },
        // Ganti emoji 👤 di bawah dengan ID Emoji Custom kamu jika punya, contoh: <:namanya:123456>
        {
          name: "👤 Customer",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
        // Menggunakan ``` (Backticks 3x) untuk membuat kotak gelap pada komentar
        { name: "💬 Comment", value: `\`\`\`${comment}\`\`\``, inline: false },
      )
      .setImage(bannerUrl) // Menampilkan banner besar di bawah
      .setTimestamp()
      .setFooter({
        text: `Reviewed by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(), // Foto user di footer
      });

    await interaction.reply({ embeds: [embed] });
  },
};
