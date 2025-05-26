import db from "$lib/server/database";
import type { Note, NoteWithTags, Tag } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const notes: Note[] = db
    .prepare(`SELECT * FROM notes ORDER BY created_at DESC`)
    .all() as Note[];

  const getTagsForNote = db.prepare(`
      SELECT tags.id, tags.name
      FROM tags
      JOIN note_tags ON tags.id = note_tags.tag_id
      WHERE note_tags.note_id = ?
    `);

  const notesWithTags: NoteWithTags[] = notes.map((note) => {
    const tags = getTagsForNote.all(note.id) as Tag[];
    return { ...note, tags };
  }) as NoteWithTags[];

  return {
    notes: notesWithTags,
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    console.log("data", data);
    const title = data.get("title");
    const content = data.get("content");
    let dataTags = data.get("tags");
    let dataLinks = data.get("links");

    if (!title) {
      return fail(400, { title, missing: true });
    }
    if (!content) {
      return fail(400, { content, missing: true });
    }

    try {
      db.prepare("INSERT INTO notes (title, content) VALUES (?, ?)").run(
        title,
        content,
      );

      const noteRow = db
        .prepare<string, { id: number }>("SELECT id FROM notes WHERE title = ?")
        .get(title.toString());
      if (!noteRow) {
        return fail(404, { title, notFound: true });
      }

      if (dataTags) {
        const tags = (dataTags as string).split(",").map((s) => s.trim());

        for (let tag of tags) {
          db.prepare("INSERT OR IGNORE INTO tags (name) VALUES (?)").run(tag);

          const tagRow = db
            .prepare<
              string,
              { id: number }
            >("SELECT id FROM tags WHERE name = ?")
            .get(tag);
          if (!tagRow) {
            return fail(404, { tag, notFound: true });
          }

          db.prepare(
            "INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)",
          ).run(noteRow.id, tagRow.id);
        }
      }

      if (dataLinks) {
        const links = (dataLinks as string).split(",").map((s) => s.trim());

        for (const targetNoteId of links) {
          db.prepare(
            "INSERT INTO note_links (source_note_id, target_note_id) VALUES (?, ?)",
          ).run(noteRow.id, targetNoteId);
        }
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      return fail(500, { message: "Failed to create note" });
    }

    redirect(303, `/`);
  },
} satisfies Actions;
