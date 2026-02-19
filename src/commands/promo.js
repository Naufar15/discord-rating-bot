const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("promo")
    .setDescription("📢 Cek promo, diskon, dan penawaran terbaru!"),

  async execute(interaction) {
    // ===============================================================
    // ⚙️ KONFIGURASI PROMO (Edit bagian ini saat ada promo baru)
    // ===============================================================

    // 1. Upload poster promosimu ke vgy.me / imgur, lalu paste link-nya di sini:
    const promoImageUrl = "https://files.catbox.moe/bpsjnt.png"; // Ini link contoh (Banner kamu sebelumnya)

    // 2. Judul dan Deskripsi Promo
    const promoTitle =
      "<a:MoonSparkle:1474018947602059407> **RAMADHAN BLESSING 2026**  ";
    const promoDesc = "*“A special seasonal collection crafted for Ramadhan.”*";

    // 3. Warna Garis Samping (Hex Code)
    const promoColor = "#FF8F8F"; // Warna Gold/Kuning

    // ===============================================================
    // 🚀 EKSEKUSI (Jurus Anti-Lag)
    // ===============================================================
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(promoColor)
      .setTitle(promoTitle)
      .setDescription(promoDesc)
      .setImage(promoImageUrl)
      .setTimestamp()
      .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.editReply({ embeds: [embed] });
  },
};
