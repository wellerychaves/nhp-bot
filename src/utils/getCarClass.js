function getClass(value) {
	/* 	const classes = {
		0: ":Classe_E:",
		250: ":Classe_D:",
		400: ":Classe_C:",
		500: ":Classe_B:",
		600: ":Classe_A:",
		750: ":Classe_S1:",
		850: ":Classe_S2:",
	}; */

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

	for (let i = 0; i < keys.length; i++) {
		if (value < keys[i]) {
			break;
		}
		result = classes[keys[i]];
	}

	return result;
}

module.exports = { getClass };
