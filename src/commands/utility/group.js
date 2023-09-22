const { SlashCommandBuilder } = require("discord.js");
const { getGroup, getNextGroupDate } = require("../../functions/getGroup");

const groupDescription =
	"Informa qual grupo de pistas está na rotação no momento";

const data = new SlashCommandBuilder()
	.setName("grupo")
	.setDescription(groupDescription)
	.addIntegerOption((option) =>
		option
			.setName("numero")
			.setDescription(
				"Insira um número caso queira saber qual a próxima aparição do grupo"
			)
	);

module.exports = {
	data,
	async execute(interaction) {
		let interactionNumber;
		if (interaction.options._hoistedOptions.length > 0) {
			interactionNumber = interaction.options._hoistedOptions[0].value;
			if (interactionNumber > 0 && interactionNumber <= 20) {
				await interaction.reply(getNextGroupDate(interactionNumber));
			} else {
				await interaction.reply({
					content: "O numero deve ser entre 1 e 20.",
					ephemeral: true,
				});
			}
		} else {
			await interaction.reply(getGroup());
		}
	},
};
