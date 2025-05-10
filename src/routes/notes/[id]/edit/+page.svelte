<script lang="ts">
    import { TagsInput } from "@skeletonlabs/skeleton-svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let tags: string[] = $state(data.note.tags.map((t) => t.name));
</script>

<div class="container mx-auto">
    <div class="flex justify-center">
        <form
            class="card preset-tonal-surface border-[1px] border-surface-200-800 w-full max-w-md mb-4 p-4 flex flex-col"
            method="POST"
            action="?/update"
        >
            <div class="mb-4">
                <label class="label" for="title">
                    <span class="label-text">Title</span>
                    <input
                        class="input"
                        id="title"
                        name="title"
                        value={data.note.title}
                    />
                </label>
            </div>
            <div class="mb-4">
                <label class="label" for="content">
                    <span class="label-text">Contents</span>
                    <textarea
                        class="textarea"
                        id="content"
                        name="content"
                        rows="5">{data.note.content}</textarea
                    >
                </label>
            </div>
            <div class="mb-4">
                <label class="label" for="tags">
                    <span class="label-text">Tags</span>
                    <input value={tags} name="tags" hidden />
                    <TagsInput
                        value={tags}
                        onValueChange={(e) => {
                            tags = e.value;
                        }}
                        placeholder="Add Tag..."
                    />
                </label>
            </div>
            <div class="mb-4">
                <button class="btn w-full preset-filled-primary-500"
                    >Update Note</button
                >
            </div>
        </form>
    </div>
</div>
