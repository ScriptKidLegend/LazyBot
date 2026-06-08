const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rate")
    .setDescription("Bakalan ngerate 1/100")
    .addUserOption(opt => opt.setName("user").setDescription("Target").setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const rating = Math.floor(Math.random()*101);
    await interaction.reply(`⭐ ${target.username} dinilai ${rating}/100`);
  }
};
