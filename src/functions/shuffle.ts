export const shuffle = <T>(array: T[]): T[] => {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j]!, arr[i]!];
	}
	return arr;
};

export const shuffleStrings = (options: Array<{ name: string; value: string }>): string => {
	const values = options.filter((o) => o.name !== "quantity").map((o) => o.value);
	const quantity = Number(options.find((o) => o.name === "quantity")?.value ?? values.length);

	const result = shuffle(values).slice(0, quantity);
	const resultString = result.map((r) => `- **${r}**`).join("\n");
	const allValues = values.join("\n- ");

	return `## Draw result:\n ${resultString}\n\nValues drawn:\n - ${allValues} `;
};
