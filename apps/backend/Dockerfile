# ─── BUILD STAGE ────────────────────────────────────────────────────────────
FROM node:26-alpine AS builder

WORKDIR /workspace

RUN npm install -g pnpm

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm nx build backend

# pnpm deploy résout nativement catalog: et workspace:*
# et crée /prod/node_modules avec uniquement les deps de production
RUN pnpm deploy --filter @game-platform/backend --prod /prod


# ─── RUNTIME STAGE ──────────────────────────────────────────────────────────
FROM node:26-alpine

WORKDIR /app

COPY --from=builder /workspace/dist/apps/backend/main.js .
COPY --from=builder /prod/node_modules                    ./node_modules

CMD ["node", "main.js"]