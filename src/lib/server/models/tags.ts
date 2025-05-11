import type { Tag } from "$lib/types";
import db from "../database";

export function getTags() {
  const tags = db
    .prepare<unknown[], Tag[]>(
      `
    SELECT id, name from tags`,
    )
    .all();

  return tags;
}
