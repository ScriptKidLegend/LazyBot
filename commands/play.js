const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Putar lagu dari judul")
    .addStringOption(opt => opt.setName("judul").setDescription("Nama lagu").setRequired(true)),
  async execute(interaction) {
    const judul = interaction.options.getString("judul");
    const vc = interaction.member.voice.channel;
    if (!vc) return interaction.reply("❌ Masuk dulu ke voice channel!");
    interaction.client.distube.play(vc, judul, { textChannel: interaction.channel, member: interaction.member });
    await interaction.reply(`🎶 Memutar: ${judul}`);
  }
};
