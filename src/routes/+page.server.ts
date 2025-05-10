import db from "$lib/server/database";
import type { Note, NoteWithTags, Tag } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const notes: Note[] = db
    .prepare(`SELECT * FROM notes ORDER BY created_at DESC LIMIT 4`)
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
