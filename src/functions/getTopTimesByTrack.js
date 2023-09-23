const axios = require("axios");
const convertSpeed = require("../utils/convertSpeed");
const { msToTime, timestampToDate } = require("../utils/convertMsToTime");
const { getClass } = require("../utils/getCarClass");

const getTopTimesByTrack = async (id, filter) => {
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

	try {
		const res = await axios.get(url);
		const items = res.data.items;

		if (items.length === 0) {
			return "Não há tempos a serem exibidos.";
		}

		let primeirosTres = items.slice(0, 3);
		console.log("items: " + items);

		primeirosTres = primeirosTres.map((item) => ({
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

		const templateString = primeirosTres
			.map(
				(item) =>
					`**${item.rank}.** ${item.personaName} - ${getClass(
						item.carRating
					)} - ${item.carName} - ${convertSpeed(
						item.topSpeed
					)} km/h - ${msToTime(item.durationMs)} - ${timestampToDate(
						item.recordedAt
					)}`
			)
			.join("\n");

		const returnString = `## Melhores tempos da pista: ${primeirosTres[0].eventName} | Filtro: ${filterNames[filter]}\n${templateString}`;

		return returnString;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getTopTimesByTrack };
