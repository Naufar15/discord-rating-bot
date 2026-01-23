async execute(interaction) {
  const stars = interaction.options.getInteger("stars");
  const comment = interaction.options.getString("comment");

  await interaction.reply(
    `⭐ **Rating:** ${stars}/5\n💬 **Comment:** ${comment}`
  );
}
