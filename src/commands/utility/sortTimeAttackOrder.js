const { SlashCommandBuilder } = require("discord.js");
const { sortOrder } = require("../../functions/sortOrder");

const description = "Realiza sorteio da ordem do time attack";

const data = new SlashCommandBuilder()
	.setName("sort_time_attack_order")
	.setDescription(description)
	.addStringOption((option) =>
		option
			.setName("input_1")
			.setDescription("Insira um valor")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("input_2")
			.setDescription("Insira um valor")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option.setName("input_3").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_4").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_5").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_6").setDescription("Insira um valor")
	);

module.exports = {
	data,
	async execute(interaction) {
		let interactionOptions;

		if (interaction.options._hoistedOptions.length > 2) {
			interactionOptions = interaction.options._hoistedOptions;
			await interaction.reply(sortOrder(interactionOptions));
		} else {
			await interaction.reply(
				"insira os valores necessários para que eu possa sortear"
			);
		}
	},
};
