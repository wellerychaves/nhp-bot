export const convertSpeed = (ms) => {
	const kmh = ms * 3.6;
	return Number.parseFloat(kmh.toFixed(2));
};
