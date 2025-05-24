<script lang="ts">
    import { read } from "$app/server";
    import type { Note } from "$lib/types.js";
    import { Pencil } from "@lucide/svelte";
    import { marked, Renderer } from "marked";

    interface Props {
        note: Note;
    }

    let { data } = $props();

    const renderer: Partial<Renderer> = {
        link({ tokens, href }) {
            if (!this.parser) return "";

            const text = this.parser.parseInline(tokens);

            return `
              <a class="text-blue-500 hover:underline" target="_blank" href="${href}">
                ${text}
              </a>
            `;
        },
    };

    marked.use({ renderer });

    const content = marked.parse(data.note.content);
</script>

<div
    class="card bg-noise bg-surface-50-950 border-[1px] border-surface-200-800 justify-center items-center p-8"
>
    <header class="flex justify-between">
        <h3 class="h3 mb-4">{data.note.title}</h3>
        <a href={`/notes/${data.note.id}/edit`} class="mt-2">
            <Pencil size={16} />
        </a>
    </header>

    <div class="markdown">
        {@html content}
    </div>
</div>
