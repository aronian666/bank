<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    export let method = "get";
    export let action;
    let form = writable();
    setContext("form", form);
</script>

<form on:submit bind:this={$form} {method} {action} {...$$restProps}>
    <slot {form} />
</form>
