const sortOrder = (array) => {
	const optionsToShuffle = [];

	for (let index = 0; index < array.length; index++) {
		optionsToShuffle.push(array[index].value);
	}

	const result = [];
	const remainingOptions = [...optionsToShuffle];

	while (remainingOptions.length > 0) {
		const sortedIndex = Math.floor(Math.random() * remainingOptions.length);
		result.push(remainingOptions[sortedIndex]);
		remainingOptions.splice(sortedIndex, 1);
	}

	let resultString = "";
	for (let i = 0; i < result.length; i++) {
		resultString += `**${i + 1}.** ${result[i]}\n`;
	}
	const returnString = `### Resultado do sorteio:\n${resultString}`;

	return returnString;
};

module.exports = { sortOrder };
