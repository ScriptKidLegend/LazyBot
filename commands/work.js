const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Kerja untuk dapat koin"),
  async execute(interaction) {
    const last = db.get(`work_${interaction.user.id}`) || 0;
    const now = Date.now();
    if (now - last < 3600000) return interaction.reply("⏳ Kamu sudah kerja baru-baru ini. Tunggu 1 jam!");

    db.set(`work_${interaction.user.id}`, now);
    const earned = Math.floor(Math.random() * 500) + 100;
    const bal = db.get(`balance_${interaction.user.id}`) || 0;
    db.set(`balance_${interaction.user.id}`, bal + earned);

    await interaction.reply(`💼 Kamu bekerja dan mendapatkan **${earned} koin**!`);
  }
};

