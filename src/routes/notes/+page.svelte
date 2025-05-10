<script lang="ts">
    import type { PageProps } from "./$types";
    import Notes from "$lib/notes.svelte";
    import CreateNote from "$lib/create-note.svelte";

    let { data }: PageProps = $props();
</script>

<div class="container mx-auto">
    <div class="grid grid-cols-12 gap-4 mt-8">
        <div class="col-start-3 col-span-4">
            <CreateNote />
        </div>
        <div class="col-span-4">
            <Notes notes={data.notes} />
        </div>
    </div>
</div>
