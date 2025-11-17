FROM oven/bun:1.3.2-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

FROM base AS production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/src ./src

CMD [ "bun", "run", "start" ]
