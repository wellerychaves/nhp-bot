import { SlashCommandBuilder } from "discord.js";
import { getGroup, getNextGroupDate } from "../functions/getGroup";

const description = "Tells you which track group is currently in rotation";

export const data = new SlashCommandBuilder()
	.setName("group")
	.setDescription(description)
	.addIntegerOption((option) =>
		option
			.setMaxValue(20)
			.setMinValue(1)
			.setName("number")
			.setDescription("Enter a number if you want to know the group's next appearance"),
	);

export async function execute(interaction) {
	const interactionNumber = interaction.options.getInteger("number");

	if (interactionNumber) {
		interaction.reply(getNextGroupDate(interactionNumber));
	} else {
		interaction.reply(getGroup());
	}
}
