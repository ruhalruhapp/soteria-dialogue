# Soteria Dialogue — production Docker image for Render
# Multi-stage build: install deps → build → minimal runtime image

# ─── Stage 1: Install dependencies ───
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy package manifests
COPY package.json bun.lock ./
COPY prisma ./prisma

# Install dependencies
RUN bun install

# ─── Stage 2: Build ───
FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bun run db:generate

# Build Next.js (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ─── Stage 3: Runtime ───
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:10000/api/health || exit 1

# Start the server. The app is client-state only (zustand persist);
# no Prisma/DB at runtime. ponytail: DB via Render Postgres linked to
# this service as DATABASE_URL is provisioned but unused — to use it,
# add prisma migrate/seed here or via preDeployCommand.
CMD ["bun", "server.js"]
