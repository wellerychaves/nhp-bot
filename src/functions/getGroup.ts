import { getDiscordTimestamp } from "../utils/dateFormatter.ts";

const START_DATE = new Date("2025-03-16T20:00:00-03:00");
const INTERVAL_MS = 2 * 36e5; // 2 hours in ms

const currentGroup = (): number => {
	const hoursDiff = (Date.now() - START_DATE.getTime()) / INTERVAL_MS;
	return Math.ceil(hoursDiff) % 20 || 20;
};

export const getRotation = (): string => {
	const group = currentGroup();
	return `The current table is **${group}/20**. See the table [here](<https://bit.ly/448OGcO>)`;
};

export const getNextRotation = (rotationNumber: number): string => {
	const now = Date.now();
	const group = currentGroup();

	const hoursUntil =
		rotationNumber === group ? 20 : rotationNumber > group ? rotationNumber - group : 20 - group + rotationNumber;

	const nextDate = new Date(now + hoursUntil * INTERVAL_MS);
	nextDate.setMinutes(0);

	const timestamp = getDiscordTimestamp(nextDate, "F");

	return rotationNumber === group
		? `Table **${rotationNumber}** is now in rotation!\nThe next rotation of this group will be on **${timestamp}**`
		: `Table **${rotationNumber}** will be in the rotation on **${timestamp}**`;
};
