// src/routes/ramen.router.ts
import { Hono } from 'hono';
import { db } from '../db/db';
import { ramenRatings } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

export const ramenRouter = new Hono();

// ----------------------------------------
// Helper Function: Fetch Single Entry
async function fetchSingleEntry(
  column: keyof typeof ramenRatings,
  value: string | number,
) {
  const condition =
    typeof value === 'number'
      ? eq(ramenRatings[column], value)
      : eq(ramenRatings[column], value);
  const row = await db.select().from(ramenRatings).where(condition).limit(1);
  return row.length > 0 ? row[0] : null;
}

// ----------------------------------------
// 1) Review Routes

// GET /ramen/review/:reviewId - Fetch a single ramen entry by review ID
ramenRouter.get('/review/:reviewId', async (c) => {
  const reviewIdStr = c.req.param('reviewId');
  const reviewId = parseInt(reviewIdStr, 10);

  if (isNaN(reviewId)) {
    return c.json({ error: 'Invalid review ID' }, 400);
  }

  const ramen = await fetchSingleEntry('review', reviewId);

  if (!ramen) {
    return c.json({ error: 'Ramen entry not found' }, 404);
  }

  return c.json(ramen);
});

// GET /ramen/distinct-reviews - Fetch all distinct review IDs
ramenRouter.get('/distinct-reviews', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT review FROM ramen_ratings ORDER BY review ASC`,
  );
  const reviews = rows.rows.map((row: { review: number }) => row.review);
  return c.json(reviews);
});

// ----------------------------------------
// 2) Brand Routes

// GET /ramen/brand/:brandName - Fetch all ramen entries by brand name
ramenRouter.get('/brand/:brandName', async (c) => {
  const brandName = c.req.param('brandName');

  if (!brandName) {
    return c.json({ error: 'Brand name is required' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.brand, brandName));
  return c.json(rows);
});

// GET /ramen/distinct-brands - Fetch all distinct brand names
ramenRouter.get('/distinct-brands', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT brand FROM ramen_ratings ORDER BY brand ASC`,
  );
  const brands = rows.rows.map((row: { brand: string }) => row.brand);
  return c.json(brands);
});

// ----------------------------------------
// 3) Variety Routes

// GET /ramen/variety/:varietyName - Fetch all ramen entries by variety name
ramenRouter.get('/variety/:varietyName', async (c) => {
  const varietyName = c.req.param('varietyName');

  if (!varietyName) {
    return c.json({ error: 'Variety name is required' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.variety, varietyName));
  return c.json(rows);
});

// GET /ramen/distinct-varieties - Fetch all distinct variety names
ramenRouter.get('/distinct-varieties', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT variety FROM ramen_ratings ORDER BY variety ASC`,
  );
  const varieties = rows.rows.map((row: { variety: string }) => row.variety);
  return c.json(varieties);
});

// ----------------------------------------
// 4) Style Routes

// GET /ramen/style/:styleName - Fetch all ramen entries by style
ramenRouter.get('/style/:styleName', async (c) => {
  const styleName = c.req.param('styleName');

  if (!styleName) {
    return c.json({ error: 'Style name is required' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.style, styleName));
  return c.json(rows);
});

// GET /ramen/distinct-styles - Fetch all distinct styles
ramenRouter.get('/distinct-styles', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT style FROM ramen_ratings ORDER BY style ASC`,
  );
  const styles = rows.rows.map((row: { style: string }) => row.style);
  return c.json(styles);
});

// ----------------------------------------
// 5) Country Routes

// GET /ramen/country/:countryName - Fetch all ramen entries by country
ramenRouter.get('/country/:countryName', async (c) => {
  const countryName = c.req.param('countryName');

  if (!countryName) {
    return c.json({ error: 'Country name is required' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.country, countryName));
  return c.json(rows);
});

// GET /ramen/distinct-countries - Fetch all distinct countries
ramenRouter.get('/distinct-countries', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT country FROM ramen_ratings ORDER BY country ASC`,
  );
  const countries = rows.rows.map((row: { country: string }) => row.country);
  return c.json(countries);
});

// ----------------------------------------
// 6) Stars Routes

// GET /ramen/stars/:starsValue - Fetch all ramen entries by star rating
ramenRouter.get('/stars/:starsValue', async (c) => {
  const starsValueStr = c.req.param('starsValue');
  const starsValue = parseFloat(starsValueStr);

  if (isNaN(starsValue)) {
    return c.json({ error: 'Invalid stars value' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.stars, starsValue));
  return c.json(rows);
});

// GET /ramen/distinct-stars - Fetch all distinct star ratings
ramenRouter.get('/distinct-stars', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT stars FROM ramen_ratings ORDER BY stars ASC`,
  );
  const stars = rows.rows.map((row: { stars: number }) => row.stars);
  return c.json(stars);
});

// ----------------------------------------
// 7) Top Ten Routes

// GET /ramen/topTen/:topTenValue - Fetch all ramen entries by Top Ten status
ramenRouter.get('/topTen/:topTenValue', async (c) => {
  const topTenValue = c.req.param('topTenValue');

  if (!topTenValue) {
    return c.json({ error: 'Top Ten value is required' }, 400);
  }

  const rows = await db
    .select()
    .from(ramenRatings)
    .where(eq(ramenRatings.topTen, topTenValue));
  return c.json(rows);
});

// GET /ramen/distinct-topTen - Fetch all distinct Top Ten statuses
ramenRouter.get('/distinct-topTen', async (c) => {
  const rows = await db.execute(
    sql`SELECT DISTINCT top_ten FROM ramen_ratings ORDER BY top_ten ASC`,
  );
  const topTenStatuses = rows.rows.map(
    (row: { top_ten: string | null }) => row.top_ten,
  );
  return c.json(topTenStatuses);
});

// ----------------------------------------
// 8) Single Entry Retrieval

// GET /ramen/entry/:reviewId - Fetch a single ramen entry by review ID (alternative route)
ramenRouter.get('/entry/:reviewId', async (c) => {
  const reviewIdStr = c.req.param('reviewId');
  const reviewId = parseInt(reviewIdStr, 10);

  if (isNaN(reviewId)) {
    return c.json({ error: 'Invalid review ID' }, 400);
  }

  const ramen = await fetchSingleEntry('review', reviewId);

  if (!ramen) {
    return c.json({ error: 'Ramen entry not found' }, 404);
  }

  return c.json(ramen);
});

// ----------------------------------------
// 9) Fallback Route

// GET /ramen - Fetch all ramen entries
ramenRouter.get('/', async (c) => {
  const all = await db.select().from(ramenRatings);
  return c.json(all);
});
