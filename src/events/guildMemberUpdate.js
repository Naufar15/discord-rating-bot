const { EmbedBuilder } = require("discord.js");
const { BOOST_CHANNEL_ID } = require("../config/env");

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember) {
    if (oldMember.premiumSince || !newMember.premiumSince) return;

    const diff = Date.now() - newMember.premiumSinceTimestamp;
    if (diff > 60 * 1000) return;

    const channel = newMember.guild.channels.cache.get(BOOST_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#ff73fa")
      .setTitle("💖 Thanks for the Boost!")
      .setDescription(
        `WOOO! <@${newMember.id}> just boosted the server!\nYou're amazing 🚀`,
      )
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  },
};
