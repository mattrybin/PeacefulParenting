import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const main = async () => {
  const connectionString = "postgresql://postgres:password@localhost/postgres"
  const sql = postgres(connectionString, { max: 1 })
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: "drizzle" })
  await sql.end()
}

main()
  .then(() => console.log("Sucessfully migrate"))
  .catch(err => console.error("Migration Failed", err))