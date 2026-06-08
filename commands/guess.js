const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Tebak angka antara 1-10"),
  async execute(interaction) {
    const number = Math.floor(Math.random()*10)+1;
    await interaction.reply("❓ Tebak angka 1-10, ketik jawabannya di chat!");

    const filter = m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time:15000, max:1 });

    collector.on("collect", m => {
      if(parseInt(m.content) === number) interaction.channel.send(`✅ Benar! Angkanya ${number}`);
      else interaction.channel.send(`❌ Salah! Angkanya adalah ${number}`);
    });

    collector.on("end", collected => {
      if(collected.size===0) interaction.channel.send("⏳ Waktu habis!");
    });
  }
};
