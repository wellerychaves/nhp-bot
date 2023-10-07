const msToTime = (duration) => {
	let milliseconds = parseInt((duration % 1000) / 10),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60);

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

	return minutes + ":" + seconds + "." + milliseconds;
};

const timestampToDate = (timestamp) => {
	const date = new Date(timestamp);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

module.exports = { msToTime, timestampToDate };
