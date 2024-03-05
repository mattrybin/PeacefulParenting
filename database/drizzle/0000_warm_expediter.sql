DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('infant', 'toddler', 'child', 'preteen', 'teen', 'adult', 'household', 'relatives', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" uuid DEFAULT gen_random_uuid(),
	"category" "category",
	"title" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
