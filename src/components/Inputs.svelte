<script>
    import Input from "./Input.svelte";
    import Select from "./Select.svelte";
    import Checkbox from "./Checkbox.svelte";
    import SelectSearch from "./SelectSearch.svelte";
    import File from "./File.svelte";
    const components = {
        select: Select,
        checkbox: Checkbox,
        selectsearch: SelectSearch,
        file: File,
    };
    export let object = {};
    export let types = {};
    export let objectName;
    objectName = objectName || object.constructor.name.toLowerCase();
</script>

{#each Object.entries(types) as [key, value]}
    {#if Array.isArray(value)}
        {#each value as types, index}
            <svelte:self
                {types}
                object={object[key][index]}
                objectName={`${objectName}[${key}][${index}]`}
            />
        {/each}
    {:else}
        <Input
            {...value}
            name={`${objectName}[${key}]`}
            bind:value={object[key]}
        />
    {/if}
{/each}
