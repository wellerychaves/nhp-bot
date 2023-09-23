const { SlashCommandBuilder } = require("discord.js");
const { getTopTimesByTrack } = require("../../functions/getTopTimesByTrack");

const description = "Retorna os 3 pilotos mais rápidos da pista";

const data = new SlashCommandBuilder()
	.setName("top-track-players")
	.setDescription(description)
	.addIntegerOption((option) =>
		option
			.setName("id")
			.setDescription("Insira o id da pista desejada")
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName("filter")
			.setDescription(
				"1 para todos os tempos; 2 para apenas tempos com uso de PU; 3 para tempos sem PU"
			)
			.setRequired(true)
	);

module.exports = {
	data,
	async execute(interaction) {
		let interactionOptions;

		if (interaction.options._hoistedOptions.length > 1) {
			interactionOptions = interaction.options._hoistedOptions;

			let id, filter;

			const idObj = interactionOptions.find((obj) => obj.name === "id");
			const filterObj = interactionOptions.find(
				(obj) => obj.name === "filter"
			);

			if (idObj) {
				id = idObj.value;
			}

			if (filterObj) {
				filter = filterObj.value;
			}

			if (filter >= 1 && filter <= 3) {
				const returnString = await getTopTimesByTrack(id, filter);
				await interaction.reply(returnString);
			} else {
				await interaction.reply({
					content:
						"O numero do filtro deve ser entre 1 e 3, confira mais detalhes na descrição do comando.",
					ephemeral: true,
				});
			}
		} else {
			await interaction.reply({
				content:
					"Ouve um erro inesperado, contate o ADW para verificar o erro",
				ephemeral: true,
			});
		}
	},
};
