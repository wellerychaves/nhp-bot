export const getClass = (value) => {
	const classes = {
		0: "Class E",
		250: "Class D",
		400: "Class C",
		500: "Class B",
		600: "Class A",
		750: "Class S1",
		850: "Class S2",
	};

	const keys = Object.keys(classes)
		.map(Number)
		.sort((a, b) => a - b);
	let result = "Invalid value";

	keys.forEach((key) => {
		if (value >= key) {
			result = classes[key];
		}
	});

	return result;
};
