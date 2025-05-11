// If there are spaces, convert to '-'
// Lowercase everything
export function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

// If there are dashes, convert to spaces
export function unslugify(value: string) {
  return value.replaceAll("-", " ");
}
