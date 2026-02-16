const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Klaim reward harian"),
  async execute(interaction) {
    const last = db.get(`daily_${interaction.user.id}`) || 0;
    const now = Date.now();
    if (now - last < 86400000) return interaction.reply("❌ Kamu sudah klaim hari ini!");
    db.set(`daily_${interaction.user.id}`, now);
    const amount = Math.floor(Math.random()*500)+100;
    const bal = db.get(`balance_${interaction.user.id}`) || 0;
    db.set(`balance_${interaction.user.id}`, bal + amount);
    await interaction.reply(`💰 Kamu mendapat ${amount} koin!`);
  }
};
