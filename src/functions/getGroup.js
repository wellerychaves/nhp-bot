import { dateFormatter } from "../utils/dateFormatter";
const startDate = new Date("2025-03-16T20:00:00-03:00");

const interval = 2 * 36e5;

export const getGroup = () => {
	const now = new Date();
	const hoursDiff = (now - startDate) / 72e5;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	const message = `The current group is **${currentGroup}/20**. See the table [here](<https://bit.ly/3XMIZwc>)`;

	return message;
};

export const getNextGroupDate = (groupNumber) => {
	const now = new Date();
	const hoursDiff = (now - startDate) / interval;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	if (groupNumber === currentGroup) {
		const nextGroupInHours = 20;
		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * interval);
		nextGroupDate.setMinutes(0);

		const formattedDate = dateFormatter(nextGroupDate, "date");
		const formattedTime = dateFormatter(nextGroupDate, "time");

		const message = `The group **${groupNumber}** is now in rotation!\nThe next rotation of this group will be on **${formattedDate}** at **${formattedTime}**`;

		return message;
	} else {
		const nextGroupInHours =
			groupNumber >= currentGroup ? groupNumber - currentGroup : 20 - currentGroup + groupNumber;

		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * interval);
		nextGroupDate.setMinutes(0);

		const formattedDate = dateFormatter(nextGroupDate, "date");
		const formattedTime = dateFormatter(nextGroupDate, "time");

		const message = `The group **${groupNumber}** will be on **${formattedDate}** from **${formattedTime}**`;

		return message;
	}
};
