import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { performance } from "perf_hooks";

const { TOKEN, CLIENT_ID } = process.env;
// initialize rest
const rest = new REST({ version: "10" }).setToken(TOKEN);

const commands = [];

const commandFiles = readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	commands.push(command.data);
}

// register commands
const registerCommands = async () => {
	const startTime = performance.now();
	try {
		console.log("Starting update of slash commands...");

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		const endTime = performance.now();
		const executionTime = endTime - startTime;

		console.log("Slash commands registered successfully");
		console.log(`Execution time (I/O + API): ${executionTime.toFixed(2)}ms`);
	} catch (err) {
		console.error(err);
	}
};

registerCommands();
