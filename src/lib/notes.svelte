<script lang="ts">
    import type { NoteWithTags } from "./types";
    import Note from "./Note.svelte";

    let props = $props();

    let notes: NoteWithTags[] = props.notes || [];
</script>

{#each notes as note}
    <Note {note} />
{/each}
