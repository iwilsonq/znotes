<script lang="ts">
    import { slugify } from "./utils/slugify";

    interface Props {
        name: string;
    }

    let { name }: Props = $props();
</script>

<a href="/tags/{slugify(name)}">
    <span class="badge preset-filled mr-1">{name}</span>
</a>
