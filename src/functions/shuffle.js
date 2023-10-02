const shuffleStrings = (array) => {
	const optionsToShuffle = [];
	let quantia;

	for (let index = 0; index < array.length; index++) {
		if (array[index].name !== "quantia") {
			optionsToShuffle.push(array[index].value);
		} else {
			quantia = array[index].value;
		}
	}

	const result = [];
	const remainingOptions = [...optionsToShuffle];

	for (let index = 0; index < quantia; index++) {
		const sortedIndex = Math.floor(Math.random() * remainingOptions.length);
		result.push(remainingOptions[sortedIndex]);
		remainingOptions.splice(sortedIndex, 1);
	}

	let resultString = "";
	for (let index = 0; index < result.length; index++) {
		resultString += `\t **${result[index]}**\n`;
	}

	const sortedValues = optionsToShuffle.join("\n- ");
	const returnString = `## Resultado do sorteio:\n ${resultString}\nValores sorteados:\n - ${sortedValues} `;

	return returnString;
};

module.exports = { shuffleStrings };
