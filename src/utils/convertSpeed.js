const convertSpeed = (ms) => {
	let kmh = ms * 3.6;
	return parseFloat(kmh.toFixed(2));
};

module.exports = convertSpeed;
