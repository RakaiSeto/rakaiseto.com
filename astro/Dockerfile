# File: Dockerfile

# Stage 1: The Build Environment
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build # This generates dist/server/entry.mjs

# Stage 2: The Final, Lightweight Nginx Runner (Nginx)
FROM nginx:alpine # <--- MUST BE NGINX IMAGE

# FIX: Copy the static assets from the `dist/client` directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose the standard HTTP port
EXPOSE 80

# The command must be Nginx
CMD ["nginx", "-g", "daemon off;"]