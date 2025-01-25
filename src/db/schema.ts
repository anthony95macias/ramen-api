// src/db/schema.ts
import { pgTable, integer, text, real } from 'drizzle-orm/pg-core';

export const ramenRatings = pgTable('ramen_ratings', {
  review: integer('review').primaryKey(),
  brand: text('brand').notNull(),
  variety: text('variety').notNull(),
  style: text('style').notNull(),
  country: text('country').notNull(),
  stars: real('stars'), // can be null if CSV is "Unrated"
  topTen: text('top_ten'), // can be null if CSV has empty
});
