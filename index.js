require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

console.log("🚀 --- MEMULAI PROSES BOOTING ---");

// Inisialisasi Client dengan Intents Lengkap
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Wajib untuk deteksi member baru/update
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences, // WAJIB: Untuk mendeteksi status Boost
    GatewayIntentBits.MessageContent, // Agar bot bisa membaca konten pesan jika diperlukan
  ],
});

// Koleksi untuk menyimpan command
client.commands = new Collection();

// 1. Jalankan Web Server (Penting untuk Render agar tetap Live)
try {
  console.log("🌐 2. Memuat Server Keep-Alive...");
  require("./src/server/keepAlive");
} catch (err) {
  console.error("❌ Gagal memuat server internal:", err.message);
}

// 2. Load Handlers (Command & Event)
try {
  console.log("📦 3. Memuat Handlers...");

  // Pastikan path ini sesuai dengan struktur foldermu
  require("./src/handlers/commandHandler")(client);
  require("./src/handlers/eventHandler")(client);

  console.log("   ✅ Handlers berhasil diinisialisasi");
} catch (err) {
  console.error("❌ ERROR CRITICAL PADA HANDLER:", err);
  // Kita tidak menghentikan proses di sini agar bot tetap mencoba login
}

// 3. Proses Login dengan Debugging Token
const token = process.env.TOKEN;

if (!token) {
  console.error("❌ ERROR: Token tidak ditemukan di Environment Variables!");
  console.log(
    "💡 Tips: Masukkan TOKEN di dashboard Render bagian Settings > Environment.",
  );
} else {
  // Debugging Token: Menampilkan 4 karakter pertama agar kamu bisa kroscek
  const maskToken = token.substring(0, 4);
  console.log(`🔍 4. Mengecek Token: Terbaca (Awal: ${maskToken}...)`);
  console.log(`📏 Panjang Token: ${token.length} karakter`);

  client
    .login(token)
    .then(() => {
      console.log("-----------------------------------------");
      console.log("🤖 STATUS: ONLINE!");
      console.log(`✅ Masuk sebagai: ${client.user.tag}`);
      console.log("🟢 Lingkaran hijau harusnya sudah muncul di Discord.");
      console.log("-----------------------------------------");
    })
    .catch((err) => {
      console.error("❌ GAGAL LOGIN KE DISCORD:");
      if (err.message === "An invalid token was provided.") {
        console.error(
          "👉 Masalah: Token salah atau sudah di-reset. Cek Developer Portal!",
        );
      } else if (err.message.includes("Privileged intents")) {
        console.error(
          "👉 Masalah: Kamu belum menyalakan 'Privileged Gateway Intents' di Developer Portal.",
        );
      } else {
        console.error(`👉 Detail Error: ${err.message}`);
      }
    });
}

// Menangani error yang tidak terduga agar bot tidak langsung mati
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});
