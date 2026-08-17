import { msToTime, timestampToDate } from "../utils/convertMsToTime.ts";
import { convertSpeed } from "../utils/convertSpeed.ts";
import { getClass } from "../utils/getCarClass.ts";

interface TrackTimeItem {
	rank: number;
	personaName: string;
	eventName: string;
	durationMs: number;
	carName: string;
	carRating: number;
	topSpeed: number;
	recordedAt: string;
}

const FILTER_PARAMS: Record<string, string> = {
	"1": "",
	"2": "?filter=with_powerups",
	"3": "?filter=no_powerups",
};

const FILTER_NAMES: Record<string, string> = {
	"1": "All times",
	"2": "Powerups-only",
	"3": "No powerups",
};

export const getTopTimesByTrack = async (
	id: number,
	filter: string,
	carClassNumber: string | null,
): Promise<string> => {
	const url = `https://panel.worldunited.gg/api/events/${id}/best-times${FILTER_PARAMS[filter] ?? ""}`;

	const res = await fetch(url);
	if (!res.ok) {
		return `API error: ${res.status}`;
	}

	const json = (await res.json()) as { items: TrackTimeItem[] };
	let items = json.items;

	if (items.length === 0) {
		return "There are no times to be shown.";
	}

	if (carClassNumber) {
		items = items.filter((o) => o.carRating <= Number(carClassNumber));
	}

	const firsts = items.slice(0, 10);
	if (firsts.length === 0) {
		return "No times found for the selected class.";
	}

	const maxName = Math.max(...firsts.map((i) => i.personaName.length));
	const maxCar = Math.max(...firsts.map((i) => i.carName.length));

	const rows = firsts
		.map(
			(item, idx) =>
				`${idx + 1}. ${item.personaName.padEnd(maxName)} - ${getClass(item.carRating)} - ${item.carName.padEnd(maxCar)} - ${convertSpeed(item.topSpeed)} km/h - ${msToTime(item.durationMs)} - ${timestampToDate(item.recordedAt)}`,
		)
		.join("\n");

	const carClass = carClassNumber ? ` | Class: ${getClass(Number(carClassNumber))}` : "";
	return `## Best track times: ${firsts[0]!.eventName} | Filter: ${FILTER_NAMES[filter]}${carClass}\n\`\`\`Markdown\n${rows}\n\`\`\``;
};
