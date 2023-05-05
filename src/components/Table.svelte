<script>
    export let array = [];
    export let header = [];
</script>

<table {...$$restProps}>
    {#if header.length}
        <thead>
            <tr>
                {#each header as name}
                    <th>{name}</th>
                {/each}
            </tr>
        </thead>
    {/if}
    <tbody>
        {#each array as item, index (item.id || index)}
            <slot {item} {index} />
        {/each}
    </tbody>
    <slot name="tfoot" />
</table>
