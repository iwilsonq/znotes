<script lang="ts">
    import { Pencil, Trash } from "@lucide/svelte";
    import type { NoteWithTags } from "./types";
    import TagToken from "./tag-token.svelte";

    let { note }: { note: NoteWithTags } = $props();
</script>

<div
    class="card preset-filled-primary-100-900 border-[1px] border-surface-200-800 w-full max-w-md p-4 mb-4 text-center"
>
    <div class="flex flex-col justify-between h-full">
        <div class="pb-4">
            <header>
                <div class="flex justify-between">
                    <h4 class="h4">{note.title}</h4>
                    <div class="flex">
                        <a href={`/notes/${note.id}/edit`} class="mt-2">
                            <Pencil size={16} />
                        </a>
                    </div>
                </div>
            </header>

            <p>
                {#if note.content.length > 255}
                    {note.content.substring(0, 255)}...
                {:else}
                    {note.content}
                {/if}
            </p>
        </div>
        <footer class="flex justify-between">
            <div class="flex">
                {#each note.tags as tag}
                    <TagToken name={tag.name} />
                {/each}
            </div>

            <form method="POST" action="/notes?/delete">
                <input name="id" value={note.id} hidden />
                <button type="submit">
                    <Trash size={16} />
                </button>
            </form>
        </footer>
    </div>
</div>
