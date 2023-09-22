function dateFormatter(date, type) {
	if (type === "date") {
		return date.toLocaleString("pt-BR", {
			month: "2-digit",
			day: "2-digit",
		});
	} else {
		return date.toLocaleString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}
}

module.exports = dateFormatter;
