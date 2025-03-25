/**
 * @param {Date} date - The date to convert.
 * @param {string} format - The format (e.g., "F", "R", "t"). Defaults to "F".
 * @returns {string} - The Discord timestamp in the format `<t:timestamp:format>`.
 */
export const getDiscordTimestamp = (date, format = "F") => {
	const timestamp = Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds (Discord timestamp format)
	return `<t:${timestamp}:${format}>`;
};

/* export const dateFormatter = (date, type) => {
	if (type === "date") {
		return date.toLocaleString("pt-BR", {
			month: "2-digit",
			day: "2-digit",
		});
	} else {
		return date.toLocaleString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}
};
*/
