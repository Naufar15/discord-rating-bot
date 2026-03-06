const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("❓ Pusat Bantuan & Pertanyaan yang sering diajukan (FAQ)"),

  async execute(interaction) {
    // 1. Jurus Anti-Timeout
    await interaction.deferReply();

    // 2. Membuat Pesan Utama (Embed Awal)
    const mainEmbed = new EmbedBuilder()
      .setColor("#00C9FF")
      .setTitle("📚 Pusat Bantuan (FAQ)")
      .setDescription(
        "Halo! Ada yang bisa kami bantu? Silakan pilih topik pertanyaanmu melalui menu dropdown di bawah ini.",
      )
      .setThumbnail("https://i.vgy.me/kZr5yI.png") // Bisa ganti logo tokomu
      .setFooter({ text: "Pilih menu di bawah ini 👇" });

    // 3. Membuat Menu Dropdown (Select Menu)
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("faq_menu")
        .setPlaceholder("Pilih pertanyaan di sini...")
        .addOptions([
          {
            label: "Cara Beli & Buka Tiket",
            description: "Panduan cara order produk di server ini",
            value: "ticket",
            emoji: "🛒",
          },
          {
            label: "Cara Pasang Preset & Mod",
            description: "Tutorial install mod grafik / Reshade untuk FiveM",
            value: "install",
            emoji: "⚙️",
          },
          {
            label: "Metode Pembayaran",
            description: "Informasi Bank, E-Wallet, & QRIS",
            value: "payment",
            emoji: "💳",
          },
          {
            label: "Produk Digital Lainnya",
            description: "Info soal Canva Template, E-Book, & Design",
            value: "digital",
            emoji: "🎨",
          },
        ]),
    );

    // 4. Mengirim Pesan Awal + Menu Dropdown
    const response = await interaction.editReply({
      embeds: [mainEmbed],
      components: [row],
    });

    // ===============================================================
    // ⚙️ KOLEKTOR: Menunggu Jawaban User (Aktif selama 2 menit)
    // ===============================================================
    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 120_000, // 120 detik (2 menit)
    });

    collector.on("collect", async (i) => {
      // Mencegah orang lain nge-klik menu yang dipanggil user ini
      if (i.user.id !== interaction.user.id) {
        return i.reply({
          content:
            "❌ Ini menu milik orang lain! Silakan ketik `/faq` sendiri ya.",
          ephemeral: true,
        });
      }

      // Menyiapkan Embed Balasan Kosong
      const replyEmbed = new EmbedBuilder().setColor("#00C9FF");

      // Menentukan balasan berdasarkan menu yang dipilih
      const selectedValue = i.values[0];

      if (selectedValue === "ticket") {
        replyEmbed
          .setTitle("🛒 Cara Order & Buka Tiket")
          .setDescription(
            "1. Pergi ke channel khusus pemesanan.\n2. Klik tombol **Open Ticket**.\n3. Isi format order yang diberikan oleh bot.\n4. Admin akan segera merespon tiketmu!",
          );
      } else if (selectedValue === "install") {
        replyEmbed
          .setTitle("⚙️ Cara Pasang Preset Reshade & Mod FiveM")
          .setDescription(
            "Setelah file berhasil diunduh:\n1. Ekstrak file .zip ke folder utama GTAV / FiveM Application Data.\n2. Buka aplikasi Reshade dan arahkan ke file eksekusi game.\n3. Pilih preset kami di menu dropdown Reshade saat in-game.\n\n*Butuh bantuan lebih lanjut? Buka tiket support!*",
          );
      } else if (selectedValue === "payment") {
        replyEmbed
          .setTitle("💳 Metode Pembayaran")
          .setDescription(
            "Kami menerima berbagai metode pembayaran untuk kemudahan transaksimu:\n\n**🏦 Bank Transfer:** BCA, Mandiri, BRI\n**📱 E-Wallet:** Dana, GoPay, OVO, ShopeePay\n**🔲 QRIS:** Tersedia (All Payment)\n\n*Nomor rekening/QRIS akan diberikan admin di dalam tiket pesanan.*",
          );
      } else if (selectedValue === "digital") {
        replyEmbed
          .setTitle("🎨 Info Produk Digital Lainnya")
          .setDescription(
            "Selain Mod & Preset, kami juga melayani:\n- Pembuatan Logo & Banner\n- Template Canva Premium\n- E-Book & Desain Kustom lainnya.\n\nLangsung tanyakan admin di tiket untuk portofolio dan harga ya!",
          );
      }

      // Mengupdate pesan (mengganti embed awal menjadi jawaban FAQ)
      await i.update({ embeds: [replyEmbed], components: [row] });
    });

    // 5. Setelah 2 menit berlalu, matikan menu agar tidak error
    collector.on("end", async () => {
      // Nonaktifkan dropdown (disabled: true)
      const disabledRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("faq_menu")
          .setPlaceholder("Waktu habis! Ketik /faq lagi.")
          .setDisabled(true)
          .addOptions([{ label: "Expired", value: "expired" }]), // Opsi dummy karena wajib ada
      );

      // Coba update pesan terakhir, abaikan jika pesannya sudah dihapus user
      try {
        await interaction.editReply({ components: [disabledRow] });
      } catch (err) {
        console.log("Pesan FAQ sudah dihapus, tidak perlu di-disable.");
      }
    });
  },
};
