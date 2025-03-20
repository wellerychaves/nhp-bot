import { SlashCommandBuilder } from "discord.js";
import { sortOrder } from "../functions/sortOrder";

const description = "Draws the order of the Time Attack";

export const data = new SlashCommandBuilder()
	.setName("sort_time_attack_order")
	.setDescription(description)
	.addStringOption((option) => option.setName("input_1").setDescription("Enter a value").setRequired(true))
	.addStringOption((option) => option.setName("input_2").setDescription("Enter a value").setRequired(true))
	.addStringOption((option) => option.setName("input_3").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_4").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_5").setDescription("Enter a value"))
	.addStringOption((option) => option.setName("input_6").setDescription("Enter a value"));

export async function execute(interaction) {
	const interactionOptions = interaction.options.data;

	const result = sortOrder(interactionOptions);

	interaction.reply(result);
}
