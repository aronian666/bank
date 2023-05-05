<script>
    import { getContext } from "svelte";
    export let name;
    export let title;
    export let hidden = false;
    export let value = "";
    export let update = false;
    //let previusValue = value;
    const form = getContext("form");
    /* $: if (update && value !== previusValue && $form) {
        $form.submit();
        previusValue = value;
    } */
</script>

<fieldset class:hidden>
    <label for={name}>{title}</label>
    <input
        autocomplete="off"
        placeholder=" "
        id={name}
        {name}
        type="text"
        bind:value
        on:change={(e) => update && $form.submit()}
        on:keypress
        {...$$restProps}
    />
</fieldset>
