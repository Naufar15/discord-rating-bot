// === Import dependencies ===
const express = require("express");
const {
  Client,
  GatewayIntentBits,
  Partials,
  SlashCommandBuilder,
  Routes,
  EmbedBuilder,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

// === Setup basic web server (anti-sleep ping) ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("✅ Discord bot is running smoothly!"));
app.listen(PORT, () => console.log(`🌐 Web service running on port ${PORT}`));

// === Environment Variables ===
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
  console.error("❌ Missing TOKEN, CLIENT_ID, or GUILD_ID in environment!");
  process.exit(1);
}

// === Initialize Discord Client ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.GuildMember, Partials.User],
});

// === Define Slash Commands ===
const commands = [
  new SlashCommandBuilder()
    .setName("rating")
    .setDescription("Give a rating and comment!")
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Select number of stars (1–5)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    )
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Write your feedback or review")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Send the server rules embed"),
].map((command) => command.toJSON());

// === Register Command to Discord ===
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
  try {
    console.log("📦 Registering slash commands...");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("✅ Slash commands registered successfully!");
  } catch (error) {
    console.error("❌ Error registering slash commands:", error);
  }
})();

// === Bot Ready ===
client.once("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);

  setInterval(() => console.log("🟢 Bot heartbeat ping"), 1000 * 60 * 5);

  setInterval(async () => {
    try {
      await fetch(
        `https://${process.env.RENDER_EXTERNAL_HOSTNAME || "localhost"}`
      );
      console.log("📡 Self-ping to keep Render instance alive");
    } catch (err) {
      console.log("⚠️ Self-ping failed:", err.message);
    }
  }, 1000 * 60 * 10);
});

// === Server Boost Detection ===
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    if (!oldMember?.premiumSince && !newMember?.premiumSince) return;
    if (!oldMember?.premiumSince && newMember?.premiumSince) {
      const diff = Date.now() - newMember.premiumSinceTimestamp;
      if (diff > 60 * 1000) return;

      const boostChannel = newMember.guild.channels.cache.get(
        "1355122803460018277"
      );
      if (!boostChannel) return;

      const thankEmbed = new EmbedBuilder()
        .setColor("#ff73fa")
        .setTitle(
          "<a:spinheartpink:1424709931252318270> Thanks for the Boost! <a:spinheartpink:1424709931252318270>"
        )
        .setDescription(
          `WOOO! <@${newMember.id}> just dropped a boost! <a:pink_flame:1424709893314842674><a:yo:1424709966266105856>\nThanks for leveling up our server — you're awesome! <a:PB_rocket_wheelchair21:1426157226417983509><a:Rocket:1426157234332893184>`
        )
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter({
          text: `${newMember.user.username} just boosted the server!`,
          iconURL: newMember.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await boostChannel.send({ embeds: [thankEmbed] });
      console.log(`💖 Sent boost thank-you message for ${newMember.user.tag}`);
    }
  } catch (error) {
    console.error("❌ Error handling boost event:", error);
  }
});

// === Slash Command Handler ===
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    // === /rating ===
    if (interaction.commandName === "rating") {
      const allowedChannels = [
        "1424685610790293524",
        "1153267423517081632",
        "1153253123427680266",
      ];

      if (!allowedChannels.includes(interaction.channelId)) {
        const errorEmbed = new EmbedBuilder()
          .setColor("#ff4d4d")
          .setTitle("⚠️ Wrong Channel")
          .setDescription(
            "You can only use this command in the **approved rating channels**!"
          )
          .setFooter({ text: "Please switch to the correct channel 🙏" });

        return await interaction.reply({
          embeds: [errorEmbed],
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
          "**Order Completed Successfully!** 🛒<a:Verify:1424709955805515849>"
        )
        .addFields(
          { name: "⭐ Rating:", value: stars },
          {
            name: "<a:amongus:1424709753426284576> Customer",
            value: `<@${user.id}>`,
          },
          {
            name: "<a:pixdreamsnani73:1424709901783011348> Comment",
            value: "```" + comment + "```",
          }
        )
        .setImage(defaultImage)
        .setFooter({
          text: `Reviewed by: ${
            user.username
          } • ${new Date().toLocaleTimeString()}`,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      console.log(`⭐ Rating received from ${user.tag}`);
    }

    // === /rules ===
    if (interaction.commandName === "rules") {
      const rulesEmbed = new EmbedBuilder()
        .setColor("#9b59b6")
        .setTitle(
          "<a:Minecraft_enchanted_book:1262325721322356828>  Rules & Guidelines"
        )
        .setDescription(
          `Selamat datang di **Barbar Boys**!  
Server ini adalah tempat berkumpulnya komunitas berbagai minat, mulai dari gaming, modding, fotografi, hingga obrolan santai, dll.  
Tujuan kami sederhana: menciptakan ruang yang nyaman, seru, dan terbuka untuk semua.  
Sebelum berinteraksi, harap baca aturan berikut agar suasana tetap positif dan menyenangkan.

---

## ⚙️ **Dashboard**
- <:Paperwork:1434157121288671262>  Baca semua aturan di <#1153261445736316998>.  
- 💠 Ambil role kamu di <#1153261498064453722>.  
---

## 📢 **Announcements**
- 📣 Info penting dari admin akan muncul di **#announcement**.  
- 🔴 sedang stream **#stream-now**.  
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
- 🖼️ Pamer hasil screenshot mod kalian di <#1426079591189057546>.  
- 💎 Booster Perks Preview <#1419968532870860880>.  
- 🎬 Preset berbayar di <#1403711998939758612>.  
- 🎬 Bagikan graphic pack berbayar di <#1420685191655067762>.  
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
- Keep channels clean, keep brain dirty (tapi no NSFW).  
- Tetap bebas, tetap liar, tapi tahu batas. Karena jadi barbar itu soal sikap, bukan kekacauan. <:asd:1426157199964504145>`
        )
        .setFooter({
          text: "Barbar Boys Community",
          iconURL: interaction.guild.iconURL(),
        })
        .setTimestamp();

      await interaction.reply({ content: "✅ Rules sent!", ephemeral: true });
      await interaction.channel.send({ embeds: [rulesEmbed] });
    }
  } catch (error) {
    console.error("❌ Error handling interaction:", error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({
        content:
          "⚠️ Sorry, something went wrong while processing your command.",
      });
    } else {
      await interaction.reply({
        content:
          "⚠️ Sorry, something went wrong while processing your command.",
        ephemeral: true,
      });
    }
  }
});

// === Login to Discord ===
client.login(token);
