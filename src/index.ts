import { readdir } from "node:fs/promises";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { BotCommand, BotEvent } from "./types";

const { TOKEN } = process.env;

// Extende o tipo padrão do Client para incluir a propriedade `commands`
declare module "discord.js" {
	interface Client {
		commands: Collection<string, BotCommand>;
	}
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection<string, BotCommand>();

// Carrega comandos
const commandFiles = (await readdir(`${import.meta.dir}/commands`)).filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
	const command = (await import(`./commands/${file}`)) as BotCommand;
	client.commands.set(command.data.name, command);
}

// Carrega eventos
const eventFiles = (await readdir(`${import.meta.dir}/events`)).filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
	const event = (await import(`./events/${file}`)) as BotEvent;
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(TOKEN);
