const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Taruhan koinmu")
    .addIntegerOption(opt => opt.setName("amount").setDescription("Jumlah koin").setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const bal = db.get(`balance_${interaction.user.id}`) || 0;
    if (amount > bal) return interaction.reply("❌ Kamu tidak punya cukup koin!");
    if (amount <= 0) return interaction.reply("❌ Jumlah tidak valid!");

    const win = Math.random() < 0.5;
    if (win) {
      db.set(`balance_${interaction.user.id}`, bal + amount);
      await interaction.reply(`🎉 Kamu menang! Mendapatkan ${amount} koin!`);
    } else {
      db.set(`balance_${interaction.user.id}`, bal - amount);
      await interaction.reply(`😢 Kamu kalah! Kehilangan ${amount} koin!`);
    }
  }
};
