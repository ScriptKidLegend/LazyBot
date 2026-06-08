const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Lihat lagu yang sedang diputar"),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) return interaction.reply("❌ Tidak ada lagu yang diputar!");
    const song = queue.songs[0];
    await interaction.reply(`🎶 Sekarang memutar: **${song.name}**`);
  }
};
