const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Lihat top XP di server"),
  async execute(interaction) {
    const all = db.all().filter(d => d.ID.startsWith("xp_"));
    const sorted = all.sort((a,b) => b.data - a.data).slice(0,10);
    const list = sorted.map((d,i) => `${i+1}. <@${d.ID.replace("xp_","")}> - ${d.data} XP`).join("\n");
    await interaction.reply(`🏆 Top XP Server:\n${list || "Tidak ada data"}`);
  }
};
