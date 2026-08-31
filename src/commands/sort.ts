import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { shuffleStrings } from "../functions/shuffle.ts";

const INPUTS = Array.from({ length: 10 }, (_, i) => `input_${i + 1}`);

export const data = new SlashCommandBuilder()
	.setName("lottery")
	.setDescription("Conducts a raffle")
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

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
	const quantity = interaction.options.getInteger("quantity", true);
	const inputs = INPUTS.map((name) => interaction.options.getString(name)).filter((v): v is string => v !== null);

	if (quantity === inputs.length) {
		await interaction.reply({
			ephemeral: true,
			content: `You want to draw ${quantity} names and you only gave me ${quantity} names... I think you've done my job.`,
		});
		return;
	}

	const options = [
		{ name: "quantity", value: String(quantity) },
		...inputs.map((v, i) => ({ name: `input_${i + 1}`, value: v })),
	];
	await interaction.reply(shuffleStrings(options));
}
