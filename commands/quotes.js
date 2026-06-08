const { SlashCommandBuilder } = require("discord.js");
const quotes = [
  "Emang kalo udah dikasih quotes, kamu bakal mikir?",
  "Malas, awokawokwk",
  "Gapapa gagal, setidaknya kamu berhasil menjadi orang gagal"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quotes")
    .setDescription("Dapatkan quotes inspiratif"),
  async execute(interaction) {
    const q = quotes[Math.floor(Math.random()*quotes.length)];
    await interaction.reply(`💡 ${q}`);
  }
};
