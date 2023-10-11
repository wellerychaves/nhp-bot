const { SlashCommandBuilder } = require("discord.js");
const { getTopTimesByTrack } = require("../../functions/getTopTimesByTrack");

const description = "Retorna os 5 pilotos mais rápidos da pista";

const data = new SlashCommandBuilder()
	.setName("track-leaders")
	.setDescription(description)
	.addIntegerOption((option) =>
		option
			.setName("id")
			.setDescription("Insira o id da pista desejada")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("filter")
			.setRequired(true)
			.setDescription("Selecione o filtro desejado")
			.addChoices(
				{ name: "All times", value: "1" },
				{ name: "Powerups-only", value: "2" },
				{ name: "No powerups", value: "3" }
			)
	)
	.addStringOption((option) =>
		option
			.setName("class")
			.setDescription(
				"Insira a clase do carro pela qual deseja exibir resultados"
			)
			.addChoices(
				{ name: "S1", value: "849" },
				{ name: "A", value: "749" },
				{ name: "B", value: "599" },
				{ name: "C", value: "499" },
				{ name: "D", value: "399" },
				{ name: "E", value: "249" }
			)
	);

module.exports = {
	data,
	async execute(interaction) {
		const id = interaction.options.getInteger("id");
		const filter = interaction.options.getString("filter");
		const carClass = interaction.options.getString("class", false);

		const returnString = await getTopTimesByTrack(id, filter, carClass);

		interaction.reply(returnString);
	},
};
