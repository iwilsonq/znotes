<script lang="ts">
    import Notes from "$lib/notes.svelte";
    import type { NoteWithTags } from "$lib/types";

    interface Props {
        data: {
            notes: NoteWithTags[];
            tagName: string;
        };
    }

    let { data }: Props = $props();
</script>

<h2 class="h2 mb-4">Notes for "{data.tagName}"</h2>
<div class="grid grid-cols-3 gap-4">
    <Notes notes={data.notes} />
</div>
