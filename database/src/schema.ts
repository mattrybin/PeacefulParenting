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

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  category: categoryEnum("category").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type Post = typeof posts.$inferSelect
export type PostCreate = typeof posts.$inferInsert