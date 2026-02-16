require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const fs = require("fs");
const db = require("quick.db");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// DisTube
client.distube = new DisTube(client, { leaveOnFinish: true, emitNewSongOnly: true });

client.once("ready", () => {
  console.log(`🔥 ${client.user.tag} ONLINE`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  // Tambahkan XP per chat
  let userXP = db.get(`xp_${interaction.user.id}`) || 0;
  db.set(`xp_${interaction.user.id}`, userXP + 10);

  try {
    await command.execute(interaction, client, db);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "❌ Terjadi error!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
