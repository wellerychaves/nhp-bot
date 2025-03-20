export const shuffle = (array) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

export const shuffleStrings = (array) => {
	const optionsToShuffle = [];
	let quantia;

	array.forEach((item) => {
		if (item.name !== "quantity") {
			optionsToShuffle.push(item.value);
		} else {
			quantia = item.value;
		}
	});

	const shuffledOptions = shuffle(optionsToShuffle);
	const result = shuffledOptions.slice(0, quantia);

	let resultString = "";
	result.forEach((res) => {
		resultString += `- **${res}**\n`;
	});

	const sortedValues = optionsToShuffle.join("\n- ");
	const returnString = `## Draw result:\n ${resultString}\nValues drawn:\n - ${sortedValues} `;

	return returnString;
};
