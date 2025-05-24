import type { Note, NoteWithTags, Tag } from "$lib/types";
import db from "../database";

export function getNotes(limit: number = 3) {
  const notes: Note[] = db
    .prepare<
      unknown[],
      Note
    >(`SELECT * FROM notes ORDER BY created_at DESC LIMIT ${limit}`)
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

  return notesWithTags;
}

export function getNotesByTag(tagName: string) {
  const notes: Note[] = db
    .prepare<string[], Note>(
      `SELECT DISTINCT n.* FROM notes n
      JOIN note_tags nt ON n.id = nt.note_id
      JOIN tags t ON nt.tag_id = t.id
      WHERE t.name = ?
      ORDER BY created_at DESC`,
    )
    .all(tagName);

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

  return notesWithTags;
}
