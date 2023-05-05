<script>
    export let name;
    export let title;
    export let options;
    export let option = ["id", "name"];
    export let value;
    const assignValue = (o, property) => {
        if (typeof property === "function") return property(o);
        if (typeof o === "object") return o[property];
        return o;
    };
</script>

<fieldset>
    <label for={name}>{title}</label>
    <select id={name} {name} bind:value>
        {#each options as o}
            <option value={assignValue(o, option[0])}>
                {assignValue(o, option[1])}
            </option>
        {/each}
    </select>
</fieldset>
