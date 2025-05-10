export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
};

export type NoteWithTags = Note & {
  tags: Tag[];
};
