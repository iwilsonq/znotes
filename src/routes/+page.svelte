<script lang="ts">
    import Notes from "$lib/notes.svelte";

    let { data }: PageProps = $props();
</script>

<main>
    <section>
        <h2 class="h2 mb-4">Recent Notes</h2>
        <div class="grid grid-cols-3 gap-4">
            <Notes notes={data.notes} />
        </div>
    </section>

    <section class="tag-cloud">
        <h2>Popular Tags</h2>
        <ul>
            <!-- Tag cloud or list goes here -->
            <li><a href="/tags/tag1">#tag1</a></li>
            <li><a href="/tags/tag2">#tag2</a></li>
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
