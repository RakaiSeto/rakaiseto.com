import { startServer } from './dist/server/entry.mjs';

startServer({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt('8092', 10),
});

console.log(`Astro server starting on port ${process.env.PORT || 4321}`);
