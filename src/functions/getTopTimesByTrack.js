import axios from "axios";
import { msToTime, timestampToDate } from "../utils/convertMsToTime";
import { convertSpeed } from "../utils/convertSpeed";
import { getClass } from "../utils/getCarClass";

export const getTopTimesByTrack = async (id, filter, carClassNumber) => {
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

	let carClass = "All classes";

	try {
		const res = await axios.get(url);
		let items = res.data.items;

		if (items.length === 0) {
			return "There are no times to be shown.";
		}

		if (carClassNumber) {
			items = items.filter((obj) => obj.carRating <= carClassNumber);
			carClass = getClass(carClassNumber);
		}

		let firsts = items.slice(0, 10);

		firsts = firsts.map((item) => ({
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

		const maxNameLength = Math.max(...firsts.map((item) => item.personaName.length));
		const maxCarNameLength = Math.max(...firsts.map((item) => item.carName.length));

		const templateString =
			"```Markdown\n" +
			firsts
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
						timestampToDate(item.recordedAt),
				)
				.join("\n") +
			"\n```";

		//const returnString = `## Melhores tempos da pista: ${firstFive[0].eventName} | Filtro: ${filterNames[filter]} \n${templateString}`;
		const returnString =
			`## Best track times: ${firsts[0].eventName} | Filter: ${filterNames[filter]}` +
			(carClass ? ` | Class: ${carClass}` : "") +
			`\n${templateString}`;
		return returnString;
	} catch (error) {
		console.error(error);
	}
};

// getTopTimesByTrack(1698, 3, 849);

/* 
		const templateString =
			"```Markdown\n" +
			"Rank | Driver".padEnd(maxNameLength + 8, " ") + // +1 para espaço extra
			"| Time     | Car".padEnd(maxCarNameLength + 6, " ") + // +1 para espaço extra
			"| Top Speed  | Recorded At        \n" +
			"-----|".padEnd(maxNameLength + 8, "-") + // Ajusta o separador
			"|----------|".padEnd(maxCarNameLength + 6, "-") + // Ajusta o separador
			"|------------|--------------------\n" +
			firsts
				.map(
					(item) =>
						item.rank.toString().padEnd(5, " ") +
						"| " +
						item.personaName.padEnd(maxNameLength + 1, " ") + // +1 para espaço extra
						"| " +
						msToTime(item.durationMs).padEnd(9, " ") +
						"| " +
						item.carName.padEnd(maxCarNameLength + 1, " ") + // +1 para espaço extra
						"| " +
						convertSpeed(item.topSpeed).toString().padEnd(10, " ") +
						"| " +
						timestampToDate(item.recordedAt).padEnd(20, " "),
				)
				.join("\n") +
			"\n```";

*/
