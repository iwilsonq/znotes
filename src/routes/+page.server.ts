import type { PageServerLoad } from "./$types";
import { getNotes } from "$lib/server/models/notes";
import { getTags } from "$lib/server/models/tags";

export const load: PageServerLoad = async ({ params }) => {
  return {
    notes: getNotes(10),
    tags: getTags(),
  };
};
