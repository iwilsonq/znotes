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

<div class="container mx-auto">
    <div class="flex justify-center">
        <div
            class="card preset-tonal-surface border-[1px] border-surface-200-800 w-full max-w-2xl mb-4 p-4 flex flex-col"
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
    </div>
</div>
