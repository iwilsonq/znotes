<script lang="ts">
    import Table from "$lib/table.svelte";
    import TagToken from "$lib/tag-token.svelte";
    import type { Note, Tag } from "$lib/types";

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
        <a class="btn preset-filled-primary-500" href="/notes"
            >Create New Note</a
        >
        <button class="btn preset-tonal-primary">Explore Notes</button>
    </section>

    <section class="mb-8">
        <Table
            rows={data.notes}
            columns={[
                { key: "title", header: "Title" },
                { key: "content", header: "Content" },
                {
                    key: "updated_at",
                    header: "Last updated",
                    format: (date) => new Date(date).toLocaleString(),
                },
            ]}
        />
    </section>

    <section class="mb-8">
        <ul class="flex flex-wrap gap-1">
            {#each data.tags as tag}
                <li><TagToken name={tag.name} /></li>
            {/each}
        </ul>
    </section>
</main>
