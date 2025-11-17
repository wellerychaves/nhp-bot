export const name = "clientReady";
export const once = true;

export function execute(client) {
	console.log(`Bot online as ${client.user.tag}`);
}
