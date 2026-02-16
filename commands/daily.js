const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Klaim reward harian (koin + XP)"),
  async execute(interaction) {
    const last = db.get(`daily_${interaction.user.id}`) || 0;
    const now = Date.now();
    if (now - last < 86400000) return interaction.reply("⏳ Kamu sudah klaim hari ini!");

    db.set(`daily_${interaction.user.id}`, now);

    // Koin
    const amount = Math.floor(Math.random() * 500) + 100;
    const bal = db.get(`balance_${interaction.user.id}`) || 0;
    db.set(`balance_${interaction.user.id}`, bal + amount);

    // XP
    const xpAmount = Math.floor(Math.random() * 50) + 20;
    const currentXP = db.get(`xp_${interaction.user.id}`) || 0;
    db.set(`xp_${interaction.user.id}`, currentXP + xpAmount);

    await interaction.reply(`💰 Kamu mendapat **${amount} koin** dan **${xpAmount} XP**!`);
  }
};
