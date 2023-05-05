<script>
    import { onMount } from "svelte";
    import Item from "./Item.svelte";
    export let property = "name";
    export let model;
    export let value;
    export let key;
    export let index = 0;
    let objects = [];
    onMount(async () => {
        const sign = value === null ? "is" : "eq";
        const { data, count } = await model.filter(
            { match: [{ key, value: `${sign}.${value}` }] },
            { perPage: 100 }
        );
        objects = data;
    });
</script>

{#if objects.length}
    <ul class="grid" style="gap: 0.5rem; padding: 0 {index * 1}rem">
        {#each objects as object, index}
            <Item {object} {property} {model} {key} />
        {/each}
    </ul>
{/if}
