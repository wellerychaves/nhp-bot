FROM oven/bun:1.3.12-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

FROM base AS production

RUN addgroup -S botgroup && adduser -S botuser -G botgroup

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/src ./src

USER botuser

CMD ["bun", "src/index.js"]