<script lang="ts">
    import { goto } from "$app/navigation";
    import Table from "$lib/table.svelte";
    import TagToken from "$lib/tag-token.svelte";
    import type { Note, Tag } from "$lib/types";
    import { NotebookPen, Edit, Trash2 } from "@lucide/svelte";

    interface Props {
        data: {
            notes: Note[];
            tags: Tag[];
        };
    }

    let { data }: Props = $props();
</script>

<main>
    <section class="flex justify-center mb-8 gap-4">
        <a class="btn preset-filled-primary-500" href="/notes">
            Create New Note
            <NotebookPen size="16" />
        </a>
    </section>

    <section class="mb-8">
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
                <div
                    class="card bg-noise bg-surface-50-950 border-[1px] border-surface-200-800 justify-center items-center p-8"
                >
                    <h3 class="h3">Goals</h3>
                    <p class="mb-4">
                        The goals should be lofy but attainable. The projects
                        should tie in some way to at least one of them.
                    </p>
                    <ul class="list-disc ml-4 mb-4">
                        <li>Run Western States or UTMB 100M</li>
                        <li>Open another income stream</li>
                    </ul>

                    <span
                        >Well-defined goals make it easier to not become
                        distracted.</span
                    >
                </div>
            </div>
            <div class="col-span-2">
                <Table
                    rows={data.notes}
                    columns={[
                        { key: "id", header: "ID" },
                        { key: "title", header: "Title" },
                        { key: "content", header: "Content" },
                        {
                            key: "updated_at",
                            header: "Last updated",
                            format: (date) => new Date(date).toLocaleString(),
                        },
                    ]}
                    actions={[
                        {
                            label: "Edit",
                            icon: Edit,
                            variant: "preset-tonal-primary",
                            url: (note: Note) => `/notes/${note.id}/edit`,
                            method: "GET",
                        },
                        {
                            label: "Delete",
                            icon: Trash2,
                            variant: "preset-tonal-error",
                            url: (note: Note) => `/notes/${note.id}?/delete`,
                            method: "POST",
                        },
                    ]}
                />
            </div>
        </div>
    </section>

    <section class="mb-8">
        <ul class="flex flex-wrap gap-1">
            {#each data.tags as tag}
                <li><TagToken name={tag.name} /></li>
            {/each}
        </ul>
    </section>
</main>
