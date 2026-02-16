const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip lagu saat ini"),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply("❌ Tidak ada lagu di queue!");
    queue.skip();
    await interaction.reply("⏭ Lagu di-skip!");
  }
};
