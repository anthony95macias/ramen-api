CREATE TABLE "ramen_ratings" (
	"review" integer PRIMARY KEY NOT NULL,
	"brand" text NOT NULL,
	"variety" text NOT NULL,
	"style" text NOT NULL,
	"country" text NOT NULL,
	"stars" real,
	"top_ten" text
);
