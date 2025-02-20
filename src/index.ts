import { Hono } from 'hono';
import { ramenRouter } from './routes/ramen.router';

// Load environment variables
import 'dotenv/config';

const app = new Hono();

app.get('/', (c) => {
  return c.html('<h3><b>Welcome to the ramen shop of ratings!</b></h3>');
});

// Use app.route() so that everything in ramenRouter is nested under /ramen
app.route('/ramen', ramenRouter);

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

Bun.serve({
  fetch(req) {
    return app.fetch(req);
  },
  port: Number(PORT), // Use PORT from .env
});

console.log(`Server running on http://localhost:${PORT}`);
