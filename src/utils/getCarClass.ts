const CLASS_MAP: Record<number, string> = {
	0: "Class E",
	250: "Class D",
	400: "Class C",
	500: "Class B",
	600: "Class A",
	750: "Class S1",
	850: "Class S2",
};

const CLASS_KEYS = Object.keys(CLASS_MAP)
	.map(Number)
	.sort((a, b) => a - b);

export const getClass = (value: number): string =>
	CLASS_KEYS.reduce((result, key) => (value >= key ? CLASS_MAP[key]! : result), "Invalid value");
