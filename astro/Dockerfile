FROM node:20-slim

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy full astro app
COPY . .

# Build
RUN npm run build

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]