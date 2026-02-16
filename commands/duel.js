const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duel")
    .setDescription("Ajak duel temanmu! Pemenang dapat uang")
    .addUserOption(opt => opt.setName("user").setDescription("Target duel").setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id) return interaction.reply("❌ Tidak bisa duel sendiri!");
    if (target.bot) return interaction.reply("❌ Tidak bisa duel bot!");

    // Pilih pemenang random
    const winner = Math.random() < 0.5 ? interaction.user : target;
    const loser = winner.id === interaction.user.id ? target : interaction.user;

    // Tentukan hadiah
    const reward = Math.floor(Math.random() * 500) + 100; // 100-600 koin
    const currentBalance = db.get(`balance_${winner.id}`) || 0;
    db.set(`balance_${winner.id}`, currentBalance + reward);

    await interaction.reply(
      `⚔️ Duel dimulai antara **${interaction.user.username}** dan **${target.username}**!\n` +
      `🏆 Pemenangnya: **${winner.username}**\n` +
      `💰 Mendapatkan ${reward} koin!`
    );
  }
};
