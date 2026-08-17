import type { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";

// Formato esperado de cada arquivo em src/commands/
export interface BotCommand {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Formato esperado de cada arquivo em src/events/
export interface BotEvent {
	name: string;
	once?: boolean;
	execute: (...args: unknown[]) => Promise<void> | void;
}
