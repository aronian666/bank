<script>
    export let options;
    export let value;
    export let title;
    export let name;
    export let option = ["id", "name"];
</script>

<fieldset>
    <h3>{title}</h3>
    <div class="flex" style="gap: 1rem">
        {#each options as item, index}
            <label>
                {#if Array.isArray(value)}
                    <input
                        type="checkbox"
                        bind:group={value}
                        name={`${name}[${index}]`}
                        value={assignValue(item, option[0])}
                    />
                {:else}
                    <input type="checkbox" bind:checked={value} {name} />
                {/if}
                {assignValue(item, option[1])}
            </label>
        {/each}
    </div>
</fieldset>
