const express = require("express");
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  EmbedBuilder,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Route sederhana agar Render tahu bot ini aktif
app.get("/", (req, res) => res.send("✅ Discord bot is running!"));
app.listen(PORT, () => console.log(`🌐 Web service running on port ${PORT}`));

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// Inisialisasi client dengan intents yang dibutuhkan
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// ===== Slash Command Registration =====
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
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("📦 Registering slash command...");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("✅ Slash command /rating registered successfully!");
  } catch (error) {
    console.error("❌ Error registering slash command:", error);
  }
})();

// ===== When Bot is Ready =====
client.once("ready", async () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

// ===== Server Boost Detection =====
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    // Deteksi boost baru
    if (!oldMember.premiumSince && newMember.premiumSince) {
      const boostChannel = newMember.guild.channels.cache.get(
        "1355122803460018277"
      ); // ID channel #boost kamu

      if (!boostChannel)
        return console.log("⚠️ Channel #boost tidak ditemukan.");

      const thankEmbed = new EmbedBuilder()
        .setColor("#ff73fa")
        .setTitle("<a:boost:1424800034560124980> Thanks for the Boost!")
        .setDescription(
          `A huge shoutout to <@${newMember.id}> for boosting the server! <a:pink_flame:1424709893314842674><a:yo:1424709966266105856>\nYou just made this community even more awesome! 🚀`
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

// ===== Rating Command =====
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

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

    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }

  if (interaction.commandName === "rating") {
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

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(token);
