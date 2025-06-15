<script lang="ts">
    import type { Note } from "$lib/types.js";
    import { Pencil } from "@lucide/svelte";
    import { marked, Renderer } from "marked";

    interface Props {
        data: {
            note: Note;
        };
    }

    let { data }: Props = $props();

    const renderer: Partial<Renderer> = {
        heading({ depth, text }) {
            return `<h${depth} class="h${depth}">${text}</h${depth}>`;
        },
        link({ tokens, href }) {
            if (!this.parser) return "";

            const text = this.parser.parseInline(tokens);

            return `
              <a class="text-blue-500 hover:underline" target="_blank" href="${href}">
                ${text}
              </a>
            `;
        },
        list({ ordered, items }) {
            if (!this.parser) return "";

            const element = ordered ? "ol" : "ul";

            const classes = ordered ? "list-decimal" : "list-disc";

            const listItems = items
                .map((listItem) => {
                    if (!this.parser) return "";
                    const text = this.parser.parse(listItem.tokens);
                    return `<li>${text}</li>`;
                })
                .join("");

            return `
            <${element} class="${classes} ml-4">${listItems}</${element}>
          `;
        },
        paragraph({ tokens }) {
            // Convert line breaks to <br> tags
            const text = this.parser?.parseInline(tokens);
            return `<p class="mb-2">${text}</p>`;
        },
        br() {
            return `<p><br/></p>`;
        },
    };

    marked.use({ renderer });

    const content = marked.parse(data.note.content, { breaks: true });
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

            <div
                class="markdown [&>p]:mb-4 [&>p]:text-gray-800 [&>li>p]:mb-2 [&>li>p]:text-current"
            >
                {@html content}
            </div>
        </div>
    </div>
</div>
