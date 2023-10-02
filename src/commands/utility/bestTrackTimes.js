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
			.setDescription("Selecione o filtro desejado")
			.setRequired(true)
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
				{ name: "S2", value: "1300" },
				{ name: "S1", value: "849" },
				{ name: "A", value: "749" },
				{ name: "B", value: "699" },
				{ name: "C", value: "499" },
				{ name: "D", value: "399" },
				{ name: "E", value: "249" }
			)
	);

module.exports = {
	data,
	async execute(interaction) {
		let interactionOptions;

		if (interaction.options._hoistedOptions.length > 1) {
			interactionOptions = interaction.options._hoistedOptions;

			let id, filter, carClass;

			const idObj = interactionOptions.find((obj) => obj.name === "id");
			const filterObj = interactionOptions.find(
				(obj) => obj.name === "filter"
			);
			const classObj = interactionOptions.find(
				(obj) => obj.name === "class"
			);

			if (idObj) {
				id = idObj.value;
			}

			if (filterObj) {
				filter = filterObj.value;
			}
			if (classObj) {
				carClass = classObj.value;
			}

			const returnString = await getTopTimesByTrack(id, filter, carClass);

			await interaction.reply(returnString);
		} else {
			await interaction.reply({
				content:
					"Ouve um erro inesperado, contate o ADW para verificar o erro",
				ephemeral: true,
			});
		}
	},
};
//
//await wait(1000);
//await interaction.editReply(shuffleStrings(interactionOptions));
