const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Lihat antrian lagu saat ini"),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) return interaction.reply("❌ Queue kosong!");
    const list = queue.songs.map((song, i) => `${i+1}. ${song.name}`).join("\n");
    await interaction.reply(`🎶 Antrian Lagu:\n${list}`);
  }
};
