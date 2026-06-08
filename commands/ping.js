const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Cek apakah bot online"),
  async execute(interaction) {
    await interaction.reply(`🏓 Pong! ${interaction.client.ws.ping}ms`);
  }
};
