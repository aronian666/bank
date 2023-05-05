<script>
    import { onMount } from "svelte";
    export let title;
    export let name;
    export let options = [];
    export let show;
    export let value;
    export let required = false;
    export let multiple = false;
    export let readonly = false;
    $: showString = show ? value?.[show] : value;
    let search = showString;
    let list = false;
    let fieldset;

    $: optionsFiltered = options.filter((option) => {
        if (!search) return true;
        const filter = show ? option[show] : option;
        return filter.toLowerCase().includes(search.toLowerCase());
    });

    onMount(() => {
        const handleEvent = (event) => {
            if (!fieldset.contains(event.target)) {
                list = false;
                search = "";
            }
        };
        document.addEventListener("mousedown", handleEvent);
        return () => {
            document.removeEventListener("mousedown", handleEvent);
        };
    });
</script>

<fieldset>
    <label for={name}>{title}</label>
    {#if multiple}
        <select class="hidden" {name} bind:value {required} multiple>
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    {:else}
        <select class="hidden" {name} bind:value {required}>
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    {/if}
    <div class="grid input" bind:this={fieldset}>
        <div class="flex items">
            {#if multiple}
                {#each value as v}
                    <span>,{v}</span>
                {/each}
            {:else}
                <span>{showString}</span>
            {/if}
            <input
                type="text"
                {readonly}
                placeholder=" "
                bind:value={search}
                on:keydown={(e) => {
                    if (e.key === "Escape") {
                        list = false;
                        search = "";
                    } else {
                        list = true;
                    }
                }}
                on:focus={(e) => {
                    list = true;
                }}
            />
        </div>
        {#if list}
            <ul>
                {#each optionsFiltered as option, i}
                    <li class="grid">
                        <button
                            type="button"
                            on:click={(e) => {
                                value = option;
                                list = false;
                                search = "";
                            }}
                        >
                            {show ? option[show] : option}
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</fieldset>

<style>
    div {
        position: relative;
    }
    ul {
        position: absolute;
        inset: 100% -1px auto -1px;
        z-index: 1;
        transition: 0.2s;
        overflow-x: auto;
        border-radius: 0.5rem;
        display: grid;
        max-height: 10rem;
        border: 1px solid var(--gray);
    }
    ul::-webkit-scrollbar {
        width: 0.5rem;
    }
    ul::-webkit-scrollbar-track {
        background-color: var(--gray);
        border-radius: 0.25rem;
    }
    ul::-webkit-scrollbar-thumb {
        background-color: var(--color1);
        border-radius: 0.25rem;
    }
    button {
        all: unset;
        padding: 0.5rem;
        background: white;
        cursor: pointer;
    }
    button:focus {
        background-color: var(--gray);
    }
    button:hover {
        background-color: var(--gray);
    }
    div:has(> input)::after {
        content: "\25be";
        position: absolute;
        right: 0.5rem;
        top: -25%;
        font-size: 1.5rem;
    }
    input {
        flex: 1;
    }
    span {
        padding: 0 0.5rem;
    }
</style>
