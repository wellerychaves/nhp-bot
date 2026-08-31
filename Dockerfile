FROM oven/bun:1.4-slim AS base
WORKDIR /app

FROM base AS builder
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY . .

FROM base AS production
RUN groupadd -r botgroup && useradd -r -g botgroup botuser
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
USER botuser
CMD ["bun", "src/index.ts"]