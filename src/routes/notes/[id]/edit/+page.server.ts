import { error, fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/server/database";
import type { Note, NoteWithTags, Tag } from "$lib/types";

export const load: PageServerLoad = async ({ params }) => {
  const note = db
    .prepare("SELECT * FROM notes WHERE id = ? LIMIT 1")
    .get(params.id) as Note;

  if (!note) {
    throw error(404, "Note not found");
  }

  const tags = db
    .prepare(
      `
    SELECT tags.id, tags.name
    FROM tags
    JOIN note_tags ON tags.id = note_tags.tag_id
    WHERE note_tags.note_id = ?
  `,
    )
    .all(note.id) as Tag[];

  return {
    note: { ...note, tags } as NoteWithTags,
  };
};

export const actions = {
  update: async ({ request, params }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");
    const dataTags = data.get("tags");

    if (!title) return fail(400, { title, missing: true });
    if (!content) return fail(400, { content, missing: true });

    try {
      db.prepare(
        "UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      ).run(title.toString(), content.toString(), params.id);

      // Delete existing tags
      db.prepare("DELETE FROM note_tags WHERE note_id = ?").run(params.id);

      // Add new tags
      if (dataTags) {
        const tags = (dataTags as string).split(",").map((s) => s.trim());
        for (let tag of tags) {
          // Insert tags that may not exist yet
          db.prepare("INSERT OR IGNORE INTO tags (name) VALUES (?)").run(tag);

          const tagRow = db
            .prepare("SELECT id FROM tags WHERE name = ?")
            .get(tag) as { id: number };

          db.prepare(
            "INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)",
          ).run(params.id, tagRow.id);
        }
      }
    } catch (error) {
      console.error("Failed to update note:", error);
      return fail(500, { message: "Failed to update note" });
    }

    redirect(303, `/notes/${params.id}`);
  },
} satisfies Actions;
