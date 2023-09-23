// convertImperialToMetric.js
const mphToKmph = (mph) => {
	let kmph = mph * 1.60934;
	return parseFloat(kmph.toFixed(3));
};

module.exports = mphToKmph;
