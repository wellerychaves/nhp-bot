function shuffleStrings(array) {
	const optionsToShuffle = []; // armazena apenas os nomes a serem sorteados
	let quantia; // armazena a quantia de palavras a ser retornadada/vezes a ser sorteado

	for (let index = 0; index < array.length; index++) {
		if (array[index].name !== "quantia") {
			optionsToShuffle.push(array[index].value);
		} else {
			quantia = array[index].value;
		}
	}

	const result = []; //
	const remainingOptions = [...optionsToShuffle];

	for (let index = 0; index < quantia; index++) {
		const sortedIndex = Math.floor(Math.random() * remainingOptions.length);
		result.push(remainingOptions[sortedIndex]);
		remainingOptions.splice(sortedIndex, 1);
	}

	let resultString = "";
	for (let index = 0; index < result.length; index++) {
		resultString += `${index + 1}- ${result[index]}\n`;
	}
	const returnString = `### Resultado do sorteio:\n${resultString}`;

	return returnString;
}

module.exports = { shuffleStrings };

shuffleStrings([
	{ name: "quantia", type: 4, value: 3 },
	{ name: "input_1", type: 3, value: "Passos" },
	{ name: "input_2", type: 3, value: "Jon" },
	{ name: "input_3", type: 3, value: "Rodrigo" },
	{ name: "input_4", type: 3, value: "ADW" },
]);
