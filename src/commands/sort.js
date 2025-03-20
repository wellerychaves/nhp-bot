import { SlashCommandBuilder } from "discord.js";
import { shuffleStrings } from "../functions/shuffle";

const description = "Conducts a raffle";

export const data = new SlashCommandBuilder()
	.setName("lottery")
	.setDescription(description)
	.addIntegerOption((option) =>
		option.setName("quantity").setDescription("Enter the number of options to be drawn").setRequired(true),
	)
	.addStringOption((option) => option.setName("input_1").setDescription("Enter a value").setRequired(true))
	.addStringOption((option) => option.setName("input_2").setDescription("Enter a value").setRequired(true))
	.addStringOption((option) => option.setName("input_3").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_4").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_5").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_6").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_7").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_8").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_9").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_10").setDescription("Enter a value"));

export async function execute(interaction) {
	const interactionOptions = interaction.options.data;

	if (interactionOptions[0].value === interactionOptions.length - 1) {
		const equalMessage = `You want to draw ${interactionOptions[0].value} names and you only gave me ${interactionOptions[0].value} names... I think you've done my job.`;

		await interaction.reply({
			ephemeral: true,
			content: equalMessage,
		});
	} else {
		await interaction.reply(shuffleStrings(interactionOptions));
	}
}
