import { REST, Routes } from "discord.js";
const { CLIENT_ID, TOKEN, GUILD_ID } = process.env;

const rest = new REST({ version: "10" }).setToken(TOKEN);

const clearCommands = async () => {
	try {
		console.log("Starting the removal of all commands...");

		// Clear global commands
		const globalCommands = await rest.get(Routes.applicationCommands(CLIENT_ID));
		if (globalCommands.length > 0) {
			for (const command of globalCommands) {
				await rest.delete(`${Routes.applicationCommands(CLIENT_ID)}/${command.id}`);
			}
			console.log("All global commands have been removed.");
		}

		// Clear guild-specific commands
		const guildCommands = await rest.get(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID));
		if (guildCommands.length > 0) {
			for (const command of guildCommands) {
				await rest.delete(`${Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)}/${command.id}`);
			}
			console.log("All guild commands have been removed.");
		}
	} catch (error) {
		console.error("An error occurred while removing commands:", error);
	}
};

clearCommands();
