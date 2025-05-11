<script lang="ts">
    import Notes from "$lib/notes.svelte";
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
    <section>
        <h2 class="h2 mb-4">Recent Notes</h2>
        <div class="grid grid-cols-3 gap-4">
            <Notes notes={data.notes} />
        </div>
    </section>

    <section class="tag-cloud">
        <h2>Tags</h2>
        <ul class="flex flex-wrap gap-1">
            {#each data.tags as tag}
                <li><TagToken name={tag.name} /></li>
            {/each}
        </ul>
    </section>

    <section class="featured">
        <h2>Current Projects</h2>
        <ul>
            <!-- Project summaries go here -->
            <li>
                <h3>Project Name</h3>
                <p>Project summary.</p>
            </li>
        </ul>
    </section>

    <div class="">
        <a class="btn preset-filled-primary-500" href="/notes"
            >Create New Note</a
        >
        <button class="btn preset-tonal-primary">Explore Notes</button>
    </div>
</main>

<footer>
    <ul>
        <li><a href="/help">Help & Documentation</a></li>
        <li><a href="/settings">Settings</a></li>
    </ul>
</footer>
