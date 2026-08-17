export const sortOrder = (options: Array<{ value: string }>): string => {
	const values = options.map((o) => o.value);
	const shuffled = [...values].sort(() => Math.random() - 0.5);
	const resultString = shuffled.map((v, i) => `**${i + 1}.** ${v}`).join("\n");
	return `### Draw results:\n${resultString}`;
};
