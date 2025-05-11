import db from "$lib/server/database";
import type { Note, NoteWithTags, Tag } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const notes: Note[] = db
    .prepare<
      unknown[],
      Note
    >(`SELECT * FROM notes ORDER BY created_at DESC LIMIT 3`)
    .all();

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

  const tags = db
    .prepare<unknown[], Tag[]>(
      `
    SELECT id, name from tags`,
    )
    .all();

  return {
    notes: notesWithTags,
    tags,
  };
};
