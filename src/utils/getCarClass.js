const getClass = (value) => {
	const classes = {
		0: "Classe E",
		250: "Classe D",
		400: "Classe C",
		500: "Classe B",
		600: "Classe A",
		750: "Classe S1",
		850: "Classe S2",
	};

	const keys = Object.keys(classes)
		.map(Number)
		.sort((a, b) => a - b);
	let result = "Valor inválido";

	keys.forEach((key) => {
		if (value >= key) {
			result = classes[key];
		}
	});

	return result;
};

module.exports = { getClass };
