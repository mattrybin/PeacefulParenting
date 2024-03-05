import { db } from "../../../db"
export async function GET() {
  const result = await db.query.posts.findMany()
  return result
}