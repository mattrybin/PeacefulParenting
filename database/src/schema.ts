import { text, timestamp, pgTable, uuid, pgEnum } from "drizzle-orm/pg-core"

export const categoryEnum = pgEnum("category", [
  "infant",
  "toddler",
  "child",
  "preteen",
  "teen",
  "adult",
  "household",
  "relatives",
  "other"
])

export const post = pgTable("post", {
  id: uuid("id").defaultRandom(),
  category: categoryEnum("category"),
  name: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
})
