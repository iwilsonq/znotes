<script lang="ts">
    import NoteForm from "$lib/note-form.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const tagNames = data.note.tags.map((t) => t.name);
</script>

<div class="container mx-auto">
    <div class="flex justify-center">
        <NoteForm
            noteId={String(data.note.id)}
            title={data.note.title}
            content={data.note.content}
            tags={tagNames}
        />
    </div>
</div>
