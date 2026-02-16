const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Cek level dan XP")
    .addUserOption(opt => opt.setName("user").setDescription("Target user")),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const xp = db.get(`xp_${user.id}`) || 0;
    const level = Math.floor(Math.sqrt(xp/100));
    await interaction.reply(`⭐ **${user.username}** - Level: ${level} | XP: ${xp}`);
  }
};
