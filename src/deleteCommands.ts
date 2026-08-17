import type { RESTGetAPIApplicationCommandsResult } from "discord.js";
import { REST, Routes } from "discord.js";

const { CLIENT_ID, TOKEN, GUILD_ID } = process.env;

const rest = new REST({ version: "10" }).setToken(TOKEN as string);

const clearCommands = async (): Promise<void> => {
	try {
		console.log("Starting the removal of all commands...");

		// Remove comandos globais
		const globalCommands = (await rest.get(
			Routes.applicationCommands(CLIENT_ID as string),
		)) as RESTGetAPIApplicationCommandsResult;

		if (globalCommands.length > 0) {
			for (const command of globalCommands) {
				await rest.delete(`${Routes.applicationCommands(CLIENT_ID as string)}/${command.id}`);
			}
			console.log("All global commands have been removed.");
		}

		// Remove comandos do servidor (guild)
		const guildCommands = (await rest.get(
			Routes.applicationGuildCommands(CLIENT_ID as string, GUILD_ID as string),
		)) as RESTGetAPIApplicationCommandsResult;

		if (guildCommands.length > 0) {
			for (const command of guildCommands) {
				await rest.delete(
					`${Routes.applicationGuildCommands(CLIENT_ID as string, GUILD_ID as string)}/${command.id}`,
				);
			}
			console.log("All guild commands have been removed.");
		}
	} catch (error) {
		console.error("An error occurred while removing commands:", error);
	}
};

clearCommands();
