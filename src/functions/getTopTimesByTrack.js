const axios = require("axios");
const convertSpeed = require("../utils/convertSpeed");
const { msToTime, timestampToDate } = require("../utils/convertMsToTime");
const { getClass } = require("../utils/getCarClass");

const getTopTimesByTrack = async (id, filter, carClassNumber) => {
	const filters = {
		1: "",
		2: "?filter=with_powerups",
		3: "?filter=no_powerups",
	};

	const filterNames = {
		1: "All times",
		2: "Powerups-only",
		3: "No powerups",
	};

	const url = `https://panel.worldunited.gg/api/events/${id}/best-times${filters[filter]}`;

	let carClass = "Todas";

	try {
		const res = await axios.get(url);
		let items = res.data.items;

		if (items.length === 0) {
			return "Não há tempos a serem exibidos.";
		}

		if (carClassNumber) {
			items = items.filter((obj) => obj.carRating <= carClassNumber);
			carClass = getClass(carClassNumber);
		}

		let firstFive = items.slice(0, 5);

		firstFive = firstFive.map((item) => ({
			rank: item.rank,
			personaId: item.personaId,
			personaName: item.personaName,
			eventId: item.eventId,
			eventName: item.eventName,
			durationMs: item.durationMs,
			carName: item.carName,
			carClass: item.carClass,
			carRating: item.carRating,
			topSpeed: item.topSpeed,
			recordedAt: item.recordedAt,
		}));

		let maxNameLength = Math.max(
			...firstFive.map((item) => item.personaName.length)
		);
		let maxCarNameLength = Math.max(
			...firstFive.map((item) => item.carName.length)
		);

		let templateString =
			"```Markdown\n" +
			firstFive
				.map(
					(item) =>
						item.rank +
						". " +
						item.personaName.padEnd(maxNameLength, " ") +
						" - " +
						getClass(item.carRating) +
						" - " +
						item.carName.padEnd(maxCarNameLength, " ") +
						" - " +
						convertSpeed(item.topSpeed) +
						" km/h - " +
						msToTime(item.durationMs) +
						" - " +
						timestampToDate(item.recordedAt)
				)
				.join("\n") +
			"\n```";

		//const returnString = `## Melhores tempos da pista: ${firstFive[0].eventName} | Filtro: ${filterNames[filter]} \n${templateString}`;
		const returnString =
			`## Melhores tempos da pista: ${firstFive[0].eventName} | Filtro: ${filterNames[filter]}` +
			(carClass ? ` | Classe: ${carClass}` : "") +
			`\n${templateString}`;
		return returnString;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getTopTimesByTrack };

// getTopTimesByTrack(1698, 3, 849);
