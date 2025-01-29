// src/index.ts
import { Hono } from 'hono';
import { ramenRouter } from './routes/ramen.router';

const app = new Hono();

app.get('/', (c) => {
  return c.html('<h3><b>Welcome to the ramen shop of ratings!</b></h3>');
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

