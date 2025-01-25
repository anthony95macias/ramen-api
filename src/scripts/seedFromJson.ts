import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
import { ramenRatings } from '../db/schema';

// Load environment variables
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// For ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedRamenRatings() {
  try {
    // 1) Load the JSON file we just generated
    const jsonFilePath = path.join(__dirname, '..', 'ramenData.json');
    const rawData = fs.readFileSync(jsonFilePath, 'utf8');
    const ramenData = JSON.parse(rawData);

    let rowCount = 0;

    // 2) Insert each row
    for (const row of ramenData) {
      let starsVal: number | null = null;
      if (
        row.stars !== undefined &&
        row.stars !== null &&
        row.stars.toString().trim().toLowerCase() !== 'unrated'
      ) {
        starsVal = parseFloat(row.stars);
      }

      const topTenVal =
        row.topTen && row.topTen.trim() !== '' ? row.topTen.trim() : null;

      await db
        .insert(ramenRatings)
        .values({
          review: Number(row.review),
          brand: row.brand,
          variety: row.variety,
          style: row.style,
          country: row.country,
          stars: starsVal,
          topTen: topTenVal,
        })
        // Skip if we already have this `review` ID
        .onConflictDoNothing({
          target: ramenRatings.review,
        });

      rowCount++;
    }

    console.log(`✅ Imported ${rowCount} new rows (duplicates skipped).`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedRamenRatings();
