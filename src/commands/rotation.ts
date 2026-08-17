import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { getNextRotation, getRotation } from "../functions/getGroup.ts";

const description = "Returns which track rotation is currently on";

export const data = new SlashCommandBuilder()
	.setName("rotation")
	.setDescription(description)
	.addIntegerOption((option) =>
		option
			.setMaxValue(20)
			.setMinValue(1)
			.setName("number")
			.setDescription("Enter a number if you want to know the table's next appearance"),
	);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
	const interactionNumber = interaction.options.getInteger("number"); // null se não informado

	if (interactionNumber !== null) {
		await interaction.reply(getNextRotation(interactionNumber));
	} else {
		await interaction.reply(getRotation());
	}
}
