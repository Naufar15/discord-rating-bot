const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  EmbedBuilder,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// Inisialisasi bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Registrasi slash command
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
    console.error(error);
  }
})();

client.once("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // ✅ Daftar channel yang diizinkan
  const allowedChannels = [
    "1424685610790293524", // Channel 1
    "1153267423517081632", // Channel 2
    "1153253123427680266", // Channel 3 (opsional)
  ];

  // Jika bukan dari salah satu channel di atas, tolak
  if (!allowedChannels.includes(interaction.channelId)) {
    const errorEmbed = new EmbedBuilder()
      .setColor("#ff4d4d")
      .setTitle("⚠️ Wrong Channel")
      .setDescription(
        "You can only use this command in the **approved rating channels**!"
      )
      .setFooter({ text: "Please switch to the correct channel 🙏" });

    return interaction.reply({
      embeds: [errorEmbed],
      ephemeral: true, // hanya terlihat oleh user tsb
    });
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
        { name: "⭐ Rating:", value: stars, inline: false },
        {
          name: "<a:amongus:1424709753426284576> Customer",
          value: `<@${user.id}>`,
          inline: false,
        },
        {
          name: "<a:pixdreamsnani73:1424709901783011348> Comment",
          value: "```" + comment + "```",
          inline: false,
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
