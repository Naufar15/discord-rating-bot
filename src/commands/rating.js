const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Submit your feedback and rating for our service!")
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Select a rating (1-5 stars)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5),
    )
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Write your review or feedback here")
        .setRequired(true),
    ),

  async execute(interaction) {
    // ===============================================================
    // 🔒 ZONE: SECURITY CHECK (Cek Izin Akses)
    // ===============================================================

    // Daftar ID Channel yang diizinkan (Rating hanya bisa di sini)
    const allowedChannels = ["1424685610790293524", "1153253123427680266"];

    // ID Role yang diizinkan (Hanya role ini yang bisa rating)
    const allowedRole = "1424684961750843503";

    // 1. Cek Apakah Channel Valid?
    if (!allowedChannels.includes(interaction.channelId)) {
      return interaction.reply({
        content: `❌ **Access Denied!**\nYou cannot use this command here.\nPlease use it in the designated review channels.`,
        ephemeral: true, // Hanya user yang melihat pesan error ini
      });
    }

    // 2. Cek Apakah User Punya Role Valid?
    if (!interaction.member.roles.cache.has(allowedRole)) {
      return interaction.reply({
        content: `❌ **Access Denied!**\nYou need the <@&${allowedRole}> role to submit a rating.`,
        ephemeral: true,
      });
    }

    // ===============================================================
    // ✅ ZONE: EXECUTION (Tampilan Custom Kamu)
    // ===============================================================

    // Ambil data inputan user
    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");

    // Generate string bintang dengan Emoji Custom
    // Pastikan ID Emoji <:Star:...> ini benar dan bot ada di server tempat emoji itu berada
    const stars = "<:Star:1469717334930358412>".repeat(starsCount);

    // --- 🖼️ IMAGE CONFIGURATION ---
    const logoUrl = "https://i.vgy.me/kZr5yI.png"; // Logo Toko (Kanan Atas)
    const bannerUrl = "https://i.vgy.me/oeXaa7.png"; // Banner Besar (Bawah)
    // -----------------------------

    const embed = new EmbedBuilder()
      .setColor("#FFA0A0") // Warna Pink Custom
      .setTitle("Customer Review")
      .setThumbnail(logoUrl)
      .setDescription(
        "**Order Completed Successfully!** 🛒<a:Verify:1424709955805515849>",
      )
      .addFields(
        {
          name: "<:Star:1469717334930358412> Rating:",
          value: `${stars}`, // Menggunakan emoji bintang custom
          inline: false,
        },
        {
          name: "<a:amongus:1424709753426284576> Customer",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
        {
          name: "<a:pixdreamsnani73:1424709901783011348> Comment",
          value: `\`\`\`${comment}\`\`\``, // Kotak gelap (code block)
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
