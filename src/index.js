import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path from "path";

const { TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// load commands
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// load events
const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = await import(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(TOKEN);
