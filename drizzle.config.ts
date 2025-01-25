import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',

  // DrizzleKit expects these now:
  dialect: 'postgresql',
  dbCredentials: {
    // Option 1: single URL
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
