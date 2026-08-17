import { readdir } from "node:fs/promises";
import { REST, Routes } from "discord.js";
import type { BotCommand } from "./types";

const { TOKEN, CLIENT_ID } = process.env;

const rest = new REST({ version: "10" }).setToken(TOKEN as string);

const registerCommands = async (): Promise<void> => {
	const commands: BotCommand["data"][] = [];

	const commandFiles = (await readdir(`${import.meta.dir}/commands`)).filter((file) => file.endsWith(".ts"));

	for (const file of commandFiles) {
		const command = (await import(`./commands/${file}`)) as BotCommand;
		commands.push(command.data);
	}

	try {
		console.log("Starting update of slash commands...");
		await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
			body: commands,
		});
		console.log("Slash commands registered successfully");
	} catch (err) {
		console.error(err);
	}
};

registerCommands();
