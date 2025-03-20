export const name = "interactionCreate";

export async function execute(interaction) {
	if (!interaction.isCommand()) {
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
		await interaction.reply({ content: "There was an error executing this command!", ephemeral: true });
	}
}
