const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Suit dengan bot")
    .addStringOption(opt => opt.setName("choice").setDescription("rock/paper/scissors").setRequired(true)),
  async execute(interaction) {
    const userChoice = interaction.options.getString("choice").toLowerCase();
    const choices = ["rock","paper","scissors"];
    if(!choices.includes(userChoice)) return interaction.reply("❌ Pilihan tidak valid!");

    const botChoice = choices[Math.floor(Math.random()*3)];
    let result;
    if(userChoice === botChoice) result = "Seri!";
    else if(
      (userChoice==="rock" && botChoice==="scissors") ||
      (userChoice==="paper" && botChoice==="rock") ||
      (userChoice==="scissors" && botChoice==="paper")
    ) result = "Kamu menang! 🎉";
    else result = "Kamu kalah! 😢";

    await interaction.reply(`🤖 Bot memilih **${botChoice}**\n🎮 Kamu memilih **${userChoice}**\n${result}`);
  }
};
