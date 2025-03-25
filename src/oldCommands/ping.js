export const data = {
	name: "ping",
	description: "Return Pong!",
};

export async function execute(interaction) {
	await interaction.reply("Pong!");
}

