# ───────────────────────
# 1) BUILD STAGE
# ───────────────────────
FROM node:20-slim AS builder

WORKDIR /app

# Install ALL dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy full project
COPY . .

# Build Astro
RUN npm run build


# ───────────────────────
# 2) RUNTIME STAGE
# ───────────────────────
FROM node:20-slim AS runner

WORKDIR /app

# Copy only package files again
COPY package*.json ./

# Install ONLY prod dependencies
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/dist ./dist

# If you need server files (adapter-node), include them too:
COPY --from=builder /app/.astro ./.astro

# EXPOSE must match Astro server port
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
