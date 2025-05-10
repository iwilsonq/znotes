<script lang="ts">
    import Header from "$lib/header.svelte";
    import "../app.css";

    let { children } = $props();
</script>

<Header />
<div class="container mx-auto mt-4">
    {@render children()}
</div>
