import type { Interaction } from "discord.js";
import { Events } from "discord.js";

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction): Promise<void> {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		return;
	}

	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err);
		const payload = { content: "There was an error executing this command!", ephemeral: true };
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(payload);
		} else {
			await interaction.reply(payload);
		}
	}
}
