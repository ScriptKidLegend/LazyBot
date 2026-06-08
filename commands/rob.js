const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Rampok koin user lain (risiko kalo gagal!)")
    .addUserOption(opt => opt.setName("user").setDescription("Target rampok").setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id) return interaction.reply("❌ Tidak bisa merampok diri sendiri!");
    
    const balTarget = db.get(`balance_${target.id}`) || 0;
    const balUser = db.get(`balance_${interaction.user.id}`) || 0;

    if (balTarget < 50) return interaction.reply("❌ Target terlalu miskin untuk dirampok!");
    if (balUser < 50) return interaction.reply("❌ Kamu terlalu miskin untuk mencoba merampok!");

    const success = Math.random() < 0.5; // 50% chance
    const amount = Math.floor(Math.random() * 100) + 50; // 50–150 koin

    if (success) {
      db.set(`balance_${interaction.user.id}`, balUser + amount);
      db.set(`balance_${target.id}`, balTarget - amount);
      await interaction.reply(`💰 Berhasil! Kamu merampok **${amount} koin** dari **${target.username}**!`);
    } else {
      const loss = Math.floor(amount / 2);
      db.set(`balance_${interaction.user.id}`, balUser - loss);
      await interaction.reply(`❌ Gagal merampok! Kamu kehilangan **${loss} koin** karena ketahuan!`);
    }
  }
};
