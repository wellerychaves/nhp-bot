import { getDiscordTimestamp } from "../utils/dateFormatter.js";

const startDate = new Date("2025-03-16T20:00:00-03:00");

const interval = 2 * 36e5;

export const getRotation = () => {
	const now = new Date();
	const hoursDiff = (now - startDate) / interval;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	const message = `The current table is **${currentGroup}/20**. See the table [here](<https://bit.ly/3XMIZwc>)`;

	return message;
};

export const getNextRotation = (rotationNumber) => {
	const now = new Date();
	const hoursDiff = (now - startDate) / interval;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	if (rotationNumber === currentGroup) {
		const nextGroupInHours = 20;
		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * interval);
		nextGroupDate.setMinutes(0);

		const timestamp = getDiscordTimestamp(nextGroupDate, "F");

		const message = `Table **${rotationNumber}** is now in rotation!\nThe next rotation of this group will be on **${timestamp}**`;

		return message;
	} else {
		const nextGroupInHours =
			rotationNumber >= currentGroup ? rotationNumber - currentGroup : 20 - currentGroup + rotationNumber;

		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * interval);
		nextGroupDate.setMinutes(0);

		const timestamp = getDiscordTimestamp(nextGroupDate, "F");

		const message = `Table **${rotationNumber}** will be in the rotation on **${timestamp}**`;

		return message;
	}
};
