const { SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

// Minimal 10 pertanyaan tingkat SMA / kelas 12
const questions = [
  { q: "Siapa presiden pertama Republik Indonesia?", a: "Soekarno" },
  { q: "Hitung integral ∫x^2 dx", a: "1/3x^3 + C" },
  { q: "Kapan Proklamasi Kemerdekaan Indonesia?", a: "17 Agustus 1945" },
  { q: "Apa rumus luas permukaan bola?", a: "4πr^2" },
  { q: "Siapa penulis Sumpah Pemuda?", a: "BPUPKI" },
  { q: "Hitung turunan f(x)=3x^3", a: "9x^2" },
  { q: "Kapan runtuhnya kerajaan Majapahit?", a: "1527" },
  { q: "Rumus Phytagoras?", a: "a^2 + b^2 = c^2" },
  { q: "Siapa Menteri Pendidikan pertama Indonesia?", a: "Ki Hajar Dewantara" },
  { q: "Hitung determinan |1 2;3 4| ?", a: "-2" }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Trivia susah! Jawaban benar dapat 10 koin + 10 XP"),
  async execute(interaction) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    await interaction.reply(`❓ ${random.q}\nKetik jawabanmu di chat! (Waktu 8 detik)`);

    const filter = m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 8000, max: 1 });

    collector.on("collect", m => {
      if (m.content.trim().toLowerCase() === random.a.toLowerCase()) {
        // Tambahkan koin
        const bal = db.get(`balance_${interaction.user.id}`) || 0;
        db.set(`balance_${interaction.user.id}`, bal + 10);
        // Tambahkan XP
        const xp = db.get(`xp_${interaction.user.id}`) || 0;
        db.set(`xp_${interaction.user.id}`, xp + 10);

        interaction.channel.send(`✅ Benar! Kamu mendapat **10 koin** dan **10 XP**!`);
      } else {
        interaction.channel.send(`❌ Salah! Jawaban yang benar: **${random.a}**`);
      }
    });

    collector.on("end", collected => {
      if (collected.size === 0) interaction.channel.send("⏳ Waktu habis!");
    });
  }
};
