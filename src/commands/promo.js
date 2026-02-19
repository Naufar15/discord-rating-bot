const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("promo")
    .setDescription("📢 Cek promo, diskon, dan penawaran terbaru toko kami!"),

  async execute(interaction) {
    // ===============================================================
    // ⚙️ KONFIGURASI PROMO (Edit bagian ini saat ada promo baru)
    // ===============================================================

    // 1. Upload poster promosimu ke vgy.me / imgur, lalu paste link-nya di sini:
    const promoImageUrl = "https://i.vgy.me/oeXaa7.png"; // Ini link contoh (Banner kamu sebelumnya)

    // 2. Judul dan Deskripsi Promo
    const promoTitle = "🔥 SUPER PROMO MINGGU INI! 🔥";
    const promoDesc =
      "Dapatkan harga spesial untuk mod FiveM, preset Reshade, dan UI Design terbaru kami!\n\nGunakan kode promo: **NANO20** saat membuka tiket pesanan.\n\n*Promo berlaku sampai akhir bulan.*";

    // 3. Warna Garis Samping (Hex Code)
    const promoColor = "#FFD700"; // Warna Gold/Kuning

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
