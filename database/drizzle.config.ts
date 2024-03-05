import type { Config } from "drizzle-kit"

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: 'postgresql://postgres:password@localhost/postgres',
  }
} satisfies Config