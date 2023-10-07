const { REST, Routes } = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(
				`[AVISO] O comando da pasta ${filePath} está faltando a propriedade obrigatoria "data" ou "execute".`
			);
		}
	}
}

const rest = new REST().setToken(TOKEN);

(async () => {
	try {
		console.log(
			`Começou a atualizar ${commands.length} comandos de (/) do aplicativo`
		);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands }
		);

		console.log(
			`Carregado com sucesso ${data.length} comandos de (/) do aplicativo`
		);
	} catch (error) {
		console.error(error);
	}
})();
