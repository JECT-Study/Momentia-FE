FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc* ./

RUN npm install -g pnpm@9.14.4

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20 AS runner
WORKDIR /app

RUN npm install -g pnpm@9.14.4

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["pnpm", "run", "start"]
