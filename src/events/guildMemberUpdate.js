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
      .setTitle(
        "<a:spinheartpink:1424709931252318270> Thanks for the Boost! <a:spinheartblue:1426157238279733328>",
      )
      .setDescription(
        `WOOO! <@${newMember.id}> just dropped a boost!<a:pink_flame:1424709893314842674><a:pink_flame:1424709893314842674>\nThanks for leveling up our server, you're awesome! <a:Rocket:1426157234332893184> <a:PB_rocket_wheelchair21:1426157226417983509>`,
      )
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  },
};
