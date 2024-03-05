import "server-only";

import { db } from "../../db";
import { Post } from "../../db/schema";
// import { toDtoMapper } from "./get-item.persistence";
// import { ItemDto } from "@/use-cases/items/types";

export async function getPosts(): Promise<Post[]> {
  const items = await db.query.posts.findMany();

  return items
  // return items.map(toDtoMapper);
}