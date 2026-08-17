export const msToTime = (duration: number): string => {
	const milliseconds = Math.floor((duration % 1000) / 10);
	const seconds = Math.floor((duration / 1000) % 60);
	const minutes = Math.floor((duration / (1000 * 60)) % 60);

	return [
		String(minutes).padStart(2, "0"),
		":",
		String(seconds).padStart(2, "0"),
		".",
		String(milliseconds).padStart(2, "0"),
	].join("");
};

export const timestampToDate = (timestamp: string): string => {
	const date = new Date(timestamp);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day}/${month}/${year} às ${hours}:${minutes}`;
};
