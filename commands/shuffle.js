const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Acak antrian lagu"),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue || queue.songs.length < 2) return interaction.reply("❌ Tidak cukup lagu untuk diacak!");
    queue.shuffle();
    await interaction.reply("🔀 Queue berhasil diacak!");
  }
};
