const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Send the server rules embed"),

  async execute(interaction) {
    const rulesEmbed = new EmbedBuilder()
      .setColor("#FFA6A6")
      .setTitle("<:enchanted_book1:1434157118939725834>  Rules & Guidelines")
      .setDescription(
        `Selamat datang di **Barbar Boys**!  
Server ini adalah tempat berkumpulnya komunitas berbagai minat, mulai dari gaming, modding, fotografi, hingga obrolan santai, dll.  
Tujuan kami sederhana: menciptakan ruang yang nyaman, seru, dan terbuka untuk semua.  
Sebelum berinteraksi, **harap baca aturan** berikut agar suasana tetap positif dan menyenangkan.
---
## ⚙️ **Dashboard**
- <:Paperwork:1434157121288671262>  Baca semua aturan di <#1153261445736316998>.  
- 💠 Ambil role kamu di <#1153261498064453722>.  
---
## 📢 **Announcements**
- 📣 Info penting dari admin akan muncul di https://discord.com/channels/392301202206883850/1153262880947458078.
- 📣 Info mod gratisan https://discord.com/channels/392301202206883850/1454182321585656034.  
- 🔴 sedang stream <#1153262934240284673>.  
- 🎥 Share link livestream kalian di <#1153302328733077525>.  
---
## 💬 **Community**
- 💭 Ngobrol bebas di <#1153272087226613770>.  
- 😂 Post meme kalian di <#1153273809936318535>.  
- <:Paperwork:1434157121288671262> Upload foto/video random di <#1153272677033844778>.  
- 📸 Pamer hasil foto kalian di <#1153272916893515847>.  
- 🎬 Share klip atau highlight di <#1153273148196790323>.  
---
## <a:ThisisaemojiHeart_3:1424709946775441490>  **Customer Review**
- ⭐ Beri rating atau ulasan pembelian kalian di <#1424685610790293524>.  
---
## 🎨 **Mod Graphic Fivem**
- 💬 Diskusi & obrolan seputar fivem di <#1359495147032940677>.  
- 🖼️ Pamer foto kalian di <#1426079591189057546>.  
- 💎 Booster Perks Preview <#1419968532870860880>.  
- 🎬 Preset berbayar di <#1403711998939758612>.  
- 🎬 Graphic pack berbayar di <#1420685191655067762>.  
- 🚧 Roads berbayar di <#1426798376007110690>.  

- 🆓 Graphic pack gratis di <#1414937176302555229>.  
- 🚧 Roads gratis di <#1359495340369252353>.  
- 🌳 Cari mod vegetasi di <#1416133460426358885>.  
- ⛺ Bagikan preset ReShade gratis di <#1359499034548506938>.  
- 🌌 Bahas atau share mod citizen di <#1427370970116784299>.  
- 🎲 Mod random di <#1371053578994843739>.  
---
## 📩 **Tickets**
- 📩 Beli di <#1353952676790013973>.  
---
## 🛡️ **Peraturan Umum**
- Hormati semua member, no toxic, no drama.  
- Jangan spam, flood, atau promosi tanpa izin.  
- **Gunakan channel sesuai fungsinya.**
- **Gunakan channel sesuai fungsinya.**
- **Gunakan channel sesuai fungsinya.**
- **Gunakan channel sesuai fungsinya.**
- Keep channels clean, keep brain dirty (tapi no NSFW).  
- Tetap bebas, tetap liar, tapi tahu batas. Karena jadi barbar itu soal sikap, bukan kekacauan. <:asd:1426157199964504145>
- **BACA PERATURAN-NYA !!!**`,
      )
      .setFooter({
        text: "Barbar Boys",
        iconURL: interaction.guild.iconURL(),
      })
      .setTimestamp();

    await interaction.reply({
      content: "✅ Rules sent!",
      ephemeral: true,
    });

    await interaction.channel.send({ embeds: [rulesEmbed] });
  },
};
