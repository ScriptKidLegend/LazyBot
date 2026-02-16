const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Hentikan musik"),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply("❌ Tidak ada musik yang diputar!");
    queue.stop();
    await interaction.reply("⏹ Musik dihentikan!");
  }
};
