<script>
    import { onMount, setContext } from "svelte";
    import { scale } from "svelte/transition";
    import Icon from "./Icon.svelte";
    export let onClose;
    setContext("onClose", onClose);
    let modal;
    onMount(() => {
        const handleEvent = (event) => {
            if (!modal.contains(event.target)) onClose();
        };
        document.addEventListener("mousedown", handleEvent);
        return () => {
            document.removeEventListener("mousedown", handleEvent);
        };
    });
</script>

<div>
    <section bind:this={modal} {...$$restProps} in:scale>
        <slot />
        <button class="holed" style="--color: black" on:click={onClose}>
            <Icon icon="close" />
        </button>
    </section>
</div>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #00000090;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    section {
        position: relative;
        min-width: 200px;
    }
    button {
        position: absolute;
        padding: 0.25rem;
        right: 0.25rem;
        top: 0.25rem;
        z-index: 1;
    }
</style>
