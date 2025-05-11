import type { PageServerLoad } from "./$types";
import { getNotesByTag } from "$lib/server/models/notes";
import { getTags } from "$lib/server/models/tags";
import { unslugify } from "$lib/utils/slugify";

export const load: PageServerLoad = async ({ params }) => {
  const tagName = unslugify(params.name);
  return {
    tagName: tagName,
    notes: getNotesByTag(tagName),
  };
};
