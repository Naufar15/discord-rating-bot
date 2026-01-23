const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Send the server rules embed"),

  async execute(interaction) {
    // logic rules embed
  },
};
