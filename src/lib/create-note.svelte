<script lang="ts">
    import { TagsInput } from "@skeletonlabs/skeleton-svelte";

    let tags: string[] = $state([]);

    $inspect(tags);
</script>

<form
    class="card preset-tonal-surface border-[1px] border-surface-200-800 w-full max-w-md mb-4 p-4 flex flex-col"
    method="POST"
    action="/notes?/create"
>
    <div class="mb-4">
        <label class="label" for="title">
            <span class="label-text">Title</span>
            <input class="input" id="title" name="title" />
        </label>
    </div>
    <div class="mb-4">
        <label class="label" for="content">
            <span class="label-text">Contents</span>
            <textarea class="textarea" id="content" name="content" rows="5"
            ></textarea>
        </label>
    </div>
    <div class="mb-4">
        <label class="label" for="links">
            <span class="label-text">Link to Note IDs (comma-separated)</span>
            <input class="input" id="links" name="links" type="text" />
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
        <button class="btn w-full preset-filled-primary-500">Create Note</button
        >
    </div>
</form>
