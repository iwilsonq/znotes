import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/server/database";
import type { Note, NoteWithTags, Tag } from "$lib/types";

export const load: PageServerLoad = async ({ params }) => {
  const note = db
    .prepare<unknown[], Note>("SELECT * FROM notes WHERE id = ? LIMIT 1")
    .get(params.id);

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
  delete: async ({ params }) => {
    const noteId = params.id;

    try {
      const changes = db
        .prepare("DELETE FROM notes WHERE id = ?")
        .run(noteId).changes;

      if (!changes) {
        return fail(404, { message: "Note ID not found" });
      }
    } catch (error) {
      return fail(500, { message: "Failed to create note" });
    }

    redirect(303, `/`);
  },
} satisfies Actions;
