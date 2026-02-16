const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop lagu atau queue")
    .addStringOption(opt => opt.setName("mode").setDescription("pilih mode: off/single/all").setRequired(true)),
  async execute(interaction) {
    const mode = interaction.options.getString("mode");
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply("❌ Tidak ada lagu yang diputar!");
    let text;
    switch(mode.toLowerCase()){
      case "off": queue.setRepeatMode(0); text="⛔ Loop dimatikan!"; break;
      case "single": queue.setRepeatMode(1); text="🔂 Lagu saat ini di-loop!"; break;
      case "all": queue.setRepeatMode(2); text="🔁 Queue di-loop!"; break;
      default: return interaction.reply("❌ Mode tidak valid: off / single / all");
    }
    await interaction.reply(text);
  }
};
