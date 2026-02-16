const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Lempar koin: head/tail (menang dapat koin, kalah minus)")
    .addStringOption(opt => opt.setName("choice").setDescription("head/tail").setRequired(true)),
  async execute(interaction) {
    const userChoice = interaction.options.getString("choice").toLowerCase();
    if(!["head","tail"].includes(userChoice)) return interaction.reply("❌ Pilih head atau tail!");

    const result = Math.random() < 0.5 ? "head" : "tail";
    const bal = db.get(`balance_${interaction.user.id}`) || 0;

    if(userChoice === result) {
      db.set(`balance_${interaction.user.id}`, bal + 15);
      await interaction.reply(`🎉 Kamu menang! Koin menunjukkan **${result}**\n💰 Kamu mendapatkan 15 koin!`);
    } else {
      const newBal = bal - 10 < 0 ? 0 : bal - 10; // Jangan minus di db
      db.set(`balance_${interaction.user.id}`, newBal);
      await interaction.reply(`😢 Kamu kalah! Koin menunjukkan **${result}**\n💸 Kehilangan 10 koin!`);
    }
  }
};
