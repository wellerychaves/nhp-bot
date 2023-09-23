const convertSpeed = (ms) => {
	let kmh = ms * 3.6;
	return parseFloat(kmh.toFixed(3));
};

module.exports = convertSpeed;
