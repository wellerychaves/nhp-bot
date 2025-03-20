import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { TOKEN, CLIENT_ID } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

// read all command files
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	commands.push(command.data);
}

// initialize rest
const rest = new REST({ version: "10" }).setToken(TOKEN);

// register commands

const registerCommands = async () => {
	try {
		console.log("Starting update of slash commands...");

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
		console.log("Slash commands registered successfully");
	} catch (err) {
		console.error(err);
	}
};

registerCommands();
