import { SlashCommandBuilder } from "discord.js";
import { getNextRotation, getRotation } from "../functions/getGroup";

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

export async function execute(interaction) {
	const interactionNumber = interaction.options.getInteger("number");

	if (interactionNumber) {
		interaction.reply(getNextRotation(interactionNumber));
	} else {
		interaction.reply(getRotation());
	}
}
