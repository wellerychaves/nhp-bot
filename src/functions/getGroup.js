const dateFormatter = require("../utils/dateFormatter");
const startDate = new Date("2023-08-12T04:00:00-03:00");

function getGroup() {
	const now = new Date();
	const hoursDiff = (now - startDate) / 36e5;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	const message = `A tabela atual é a **${currentGroup}/20**. Consulte a tabela em <#1124124150840180866>`;

	return message;
}

function getNextGroupDate(groupNumber) {
	const now = new Date();
	const hoursDiff = (now - startDate) / 36e5;
	const currentGroup = Math.ceil(hoursDiff) % 20 || 20;

	if (groupNumber === currentGroup) {
		const nextGroupInHours = 20;
		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * 36e5);
		nextGroupDate.setMinutes(0);

		const formattedDate = dateFormatter(nextGroupDate, "date");
		const formattedTime = dateFormatter(nextGroupDate, "time");

		const message = `O grupo **${groupNumber}** está agora na rotação!\nA proxima rotação deste grupo será dia **${formattedDate}** a partir das **${formattedTime}**`;

		return message;
	} else {
		const nextGroupInHours =
			groupNumber >= currentGroup
				? groupNumber - currentGroup
				: 20 - currentGroup + groupNumber;

		const nextGroupDate = new Date(now.getTime() + nextGroupInHours * 36e5);
		nextGroupDate.setMinutes(0);

		const formattedDate = dateFormatter(nextGroupDate, "date");
		const formattedTime = dateFormatter(nextGroupDate, "time");

		const message = `O grupo **${groupNumber}** será dia **${formattedDate}** a partir das **${formattedTime}**`;

		return message;
	}
}

module.exports = {
	getGroup,
	getNextGroupDate,
};
