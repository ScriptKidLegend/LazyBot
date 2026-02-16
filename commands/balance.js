const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Cek saldo koinmu")
    .addUserOption(opt => opt.setName("user").setDescription("Target user")),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const bal = db.get(`balance_${user.id}`) || 0;
    await interaction.reply(`💰 **${user.username}** memiliki ${bal} koin.`);
  }
};
