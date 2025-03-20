import { SlashCommandBuilder } from "discord.js";
import { getTopTimesByTrack } from "../functions/getTopTimesByTrack";

const description = "The 10 fastest riders on the track return";

export const data = new SlashCommandBuilder()
	.setName("track-leaders")
	.setDescription(description)
	.addIntegerOption((option) =>
		option.setName("id").setDescription("Enter the ID of the desired track").setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName("filter")
			.setRequired(true)
			.setDescription("Select the desired filter")
			.addChoices(
				{ name: "All times", value: "1" },
				{ name: "Powerups-only", value: "2" },
				{ name: "No powerups", value: "3" },
			),
	)
	.addStringOption((option) =>
		option
			.setName("class")
			.setDescription("Enter the car class you want to display results for")
			.addChoices(
				{ name: "S1", value: "849" },
				{ name: "A", value: "749" },
				{ name: "B", value: "599" },
				{ name: "C", value: "499" },
				{ name: "D", value: "399" },
				{ name: "E", value: "249" },
			),
	);

export async function execute(interaction) {
	const id = interaction.options.getInteger("id");
	const filter = interaction.options.getString("filter");
	const carClass = interaction.options.getString("class", false);

	const returnString = await getTopTimesByTrack(id, filter, carClass);

	interaction.reply(returnString);
}
