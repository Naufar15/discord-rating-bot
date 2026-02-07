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

    // 1. Daftar ID Channel yang diizinkan
    const allowedChannels = ["1424685610790293524", "1153253123427680266"];

    // 2. Daftar ID Role yang diizinkan (TAMBAHAN ROLE BARU DI SINI)
    const allowedRoles = [
      "1424684961750843503", // Role A (Customer)
      "1153234026254053407", // Role B (Role Baru)
    ];

    // --- LOGIKA PENGECEKAN CHANNEL ---
    if (!allowedChannels.includes(interaction.channelId)) {
      return interaction.reply({
        content: `❌ **Access Denied!**\nYou cannot use this command here.\nPlease use it in the designated review channels.`,
        ephemeral: true,
      });
    }

    // --- LOGIKA PENGECEKAN ROLE (Revisi: Cek salah satu dari list) ---
    // Fungsi ini mengecek apakah user punya minimal SATU role dari daftar di atas
    const hasPermission = allowedRoles.some((roleId) =>
      interaction.member.roles.cache.has(roleId),
    );

    if (!hasPermission) {
      // Kita buat pesan error yang mencantumkan semua role yang diizinkan
      const rolesTag = allowedRoles.map((id) => `<@&${id}>`).join(" or ");

      return interaction.reply({
        content: `❌ **Access Denied!**\nYou need the ${rolesTag} role to submit a rating.`,
        ephemeral: true,
      });
    }

    // ===============================================================
    // ✅ ZONE: EXECUTION (Tampilan Custom Kamu - TIDAK BERUBAH)
    // ===============================================================

    const starsCount = interaction.options.getInteger("stars");
    const comment = interaction.options.getString("comment");

    const stars = "<:Star:1469717334930358412>".repeat(starsCount);

    const logoUrl = "https://i.vgy.me/kZr5yI.png";
    const bannerUrl = "https://i.vgy.me/oeXaa7.png";

    const embed = new EmbedBuilder()
      .setColor("#FFA0A0")
      .setTitle("Customer Review")
      .setThumbnail(logoUrl)
      .setDescription(
        "**Order Completed Successfully!** 🛒<a:Verify:1424709955805515849>",
      )
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
