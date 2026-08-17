/**
 * @param date - The date to convert.
 * @param format - The format (e.g., "F", "R", "t"). Defaults to "F".
 * @returns The Discord timestamp in the format `<t:timestamp:format>`.
 */
export const getDiscordTimestamp = (date: Date, format = "F"): string =>
	`<t:${Math.floor(date.getTime() / 1000)}:${format}>`;
