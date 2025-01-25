// src/index.ts
import { Hono } from 'hono';
import { ramenRouter } from './routes/ramen.router';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Welcome to the ramen shop of ratings!');
});

// Use app.route() so that everything in ramenRouter is nested under /ramen
app.route('/ramen', ramenRouter);

Bun.serve({
  fetch(req) {
    return app.fetch(req);
  },
  port: 3000,
});

console.log('Server running on http://localhost:3000');
