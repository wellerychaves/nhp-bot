const { SlashCommandBuilder } = require("discord.js");
const { getGroup, getNextGroupDate } = require("../../functions/getGroup");

const data = new SlashCommandBuilder()
	.setName("grupo")
	.setDescription("Informa qual grupo de pistas está na rotação no momento")
	.addIntegerOption((option) =>
		option
			.setMaxValue(20)
			.setMinValue(1)
			.setName("numero")
			.setDescription(
				"Insira um número caso queira saber qual a próxima aparição do grupo"
			)
	);

module.exports = {
	data,
	execute(interaction) {
		let interactionNumber = interaction.options.getInteger("numero");

		if (interactionNumber) {
			interaction.reply(getNextGroupDate(interactionNumber));
		} else {
			interaction.reply(getGroup());
		}
	},
};
