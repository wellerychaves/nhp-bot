# NHP Bot

Discord bot for the **New Horizon Project** server — a Need for Speed World community.

## Commands

### `/track-leaders`

Shows the top 10 fastest times on a given track.

| Option   | Required | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| `id`     | ✅       | Track ID                                           |
| `filter` | ✅       | `All times`, `Powerups-only`, or `No powerups`     |
| `class`  | ❌       | Filter by car class: `S1`, `A`, `B`, `C`, `D`, `E` |

### `/rotation`

Shows which of the 20 event tables is currently active.

| Option   | Required | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| `number` | ❌       | If provided, shows when that table will next appear in rotation |

## Stack

- **Runtime:** [Bun](https://bun.sh)
- **Language:** TypeScript
- **Discord:** [discord.js](https://discord.js.org) v14
- **HTTP:** Native `fetch` (no extra dependencies)

## Setup

```sh
# Install dependencies
bun install

# Copy and fill in your credentials
cp .env.example .env
```

**.env**

```ini
TOKEN=your-bot-token
CLIENT_ID=your-application-id
GUILD_ID=your-server-id
```

## Scripts

```sh
bun run start    # Start the bot
bun run deploy   # Register slash commands on Discord
bun run clear    # Remove all registered slash commands
bun run lint     # Run Biome linter
```

> Run `deploy` once after adding or changing commands. You don't need to run it on every start.
