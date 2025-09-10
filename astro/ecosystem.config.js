// File: ecosystem.config.js
module.exports = {
    apps: [{
      name: "chery-web",
      script: "./dist/server/entry.mjs",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: "production",
        PORT: 4321,
        HOST: "0.0.0.0", // Add this line
      },
    }]
  };