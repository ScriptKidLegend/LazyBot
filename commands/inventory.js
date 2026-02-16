const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Lihat itemmu")
    .addUserOption(opt => opt.setName("user").setDescription("Target user")),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const items = db.get(`inventory_${user.id}`) || [];
    if (items.length === 0) return interaction.reply(`${user.username} tidak punya item apapun.`);
    await interaction.reply(`🎒 **${user.username}** memiliki item: ${items.join(", ")}`);
  }
};
