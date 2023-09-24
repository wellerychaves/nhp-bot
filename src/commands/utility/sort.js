const { shuffleStrings } = require("../../functions/shuffle");
// const wait = require("node:timers/promises").setTimeout;
const { SlashCommandBuilder } = require("discord.js");

const description = "Realiza sorteio";

const data = new SlashCommandBuilder()
	.setName("sorteio")
	.setDescription(description)
	.addIntegerOption((option) =>
		option
			.setName("quantia")
			.setDescription("insira a quantia de opções a serem sorteadas")
			.setRequired(true)
	)
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
	)
	.addStringOption((option) =>
		option.setName("input_7").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_8").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_9").setDescription("Insira um valor")
	)
	.addStringOption((option) =>
		option.setName("input_10").setDescription("Insira um valor")
	);

module.exports = {
	data,
	async execute(interaction) {
		let interactionOptions;

		if (interaction.options._hoistedOptions.length > 2) {
			interactionOptions = interaction.options._hoistedOptions;
			if (interactionOptions[0].value === interactionOptions.length - 1) {
				const equalMessage = `Você quer sortear ${interactionOptions[0].value} nomes e me forneceu apenas ${interactionOptions[0].value} nomes... Acho que você já fez o meu trabalho.`;

				await interaction.reply({
					ephemeral: true,
					content: equalMessage,
				});
			} else {
				await interaction.reply(shuffleStrings(interactionOptions));
				//await interaction.reply("### E o resultado do sorteio é...");
				//await wait(1000);
				//await interaction.editReply(shuffleStrings(interactionOptions));
			}
		} else {
			await interaction.reply({
				content: requirementsMessage,
				ephemeral: true,
			});
		}
	},
};
