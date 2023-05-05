<script>
    export let name;
    export let title;
    export let value;
</script>

<fieldset>
    <label for={name}>{title}</label>
    <label>
        <input type="file" bind:value id={name} {name} {...$$restProps} />
    </label>
</fieldset>
