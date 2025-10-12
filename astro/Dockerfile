# File: Dockerfile

# Stage 1: The Build Environment
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build # This generates dist/server/entry.mjs

# Stage 2: The Final, Lightweight Node.js Runner
FROM node:18-alpine

# === THE FINAL FIX: CREATE USER AND GROUP IN THE FINAL STAGE ===
# 1. Create the group
RUN addgroup -S appgroup
# 2. Create the user and add them to the group
RUN adduser -S appuser -G appgroup

# === THE FINAL FIX: CREATE USER AND GROUP IN THE FINAL STAGE ===
# 1. Create the group
RUN addgroup -S appgroup
# 2. Create the user and add them to the group
RUN adduser -S appuser -G appgroup

USER appuser
WORKDIR /usr/src/app

# Copy dependencies, PM2 config, and the built output
COPY --chown=appuser:appgroup --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=appuser:appgroup --from=builder /usr/src/app/dist ./dist
COPY --chown=appuser:appgroup --from=builder /usr/src/app/ecosystem.config.js .

# The production command to start your application via PM2
# This must point to the correct Astro entry file
CMD ["/usr/src/app/node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js"]