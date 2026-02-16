require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
});

// Command collection
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// DisTube music
client.distube = new DisTube(client, { leaveOnFinish: true, emitNewSongOnly: true });

client.once("ready", () => {
  console.log(`🔥 ${client.user.tag} ONLINE`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "❌ Terjadi error!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
