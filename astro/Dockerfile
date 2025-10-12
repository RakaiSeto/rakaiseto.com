# File: Dockerfile

# Stage 1: The Build Environment
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: The Final, Lightweight Nginx Image
FROM nginx:alpine

# FIX: Copy the static assets from the `dist/client` directory
COPY --from=builder /usr/src/app/dist/client /usr/share/nginx/html

# Expose the standard HTTP port
EXPOSE 80

# The command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]