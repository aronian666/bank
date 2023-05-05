<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let steps = [];
    let step = writable(0);
    setContext("step", step);
    const updateStep = (newStep) => step.set(newStep);
</script>

<section style="gap: 1rem" class="grid" {...$$restProps}>
    <nav
        class="flex content"
        style="--c: space-between; position: relative; --length: {steps.length}"
    >
        {#each steps as a, i}
            <div
                class:active={i <= $step}
                class="grid content"
                style="--c: center"
            >
                {i + 1}
            </div>
            {#if i !== steps.length - 1}
                <span style="--index: {i}" class:active={i < $step} />
            {/if}
        {/each}
    </nav>

    <slot step={$step} {updateStep} />
</section>

<style>
    div {
        width: 3rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--gray);
        position: relative;
        color: white;
        z-index: 1;
    }
    div.active {
        background-color: var(--color1);
        transition-delay: 0.3s;
    }
    span {
        --percentage: calc(100% / (var(--length) - 1));
        position: absolute;
        height: 0.5rem;
        width: var(--percentage);
        background-color: var(--gray);
        left: calc(var(--percentage) * var(--index));
        top: 50%;
        translate: 0 -50%;
    }
    span::after {
        content: " ";
        position: absolute;
        height: 100%;
        scale: 0 1;
        background-color: var(--color1);
        width: 100%;
        transition: 0.5s cubic-bezier(0.09, 0.57, 0.24, 0.94);
        transform-origin: left;
    }
    span.active::after {
        scale: 1 1;
    }
</style>
