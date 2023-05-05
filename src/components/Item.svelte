<script>
    import Icon from "./Icon.svelte";
    import Nested from "./Nested.svelte";
    import Modal from "./Modal.svelte";
    import Form from "./Form.svelte";
    import Input from "./Input.svelte";
    export let object;
    export let property;
    export let model;
    export let key;
    let edit = false;
    let expand = false;
    let newObject;
</script>

<li class="grid" style="gap: 0.5rem">
    <div class="flex" style="gap: 0.5rem">
        <input
            type="text"
            bind:value={object[property]}
            on:keypress={async (e) => {
                if (e.key === "Enter") {
                    await object.upsert();
                    edit = false;
                }
            }}
            on:dblclick={(e) => (edit = true)}
            on:blur={async (e) => {
                if (edit) await object.upsert();
                edit = false;
            }}
            readonly={!edit}
        />
        <button class="icon" type="button" on:click={(e) => (expand = !expand)}>
            <Icon icon={expand ? "expand_less" : "expand_more"} />
        </button>
        <button
            class="icon"
            type="button"
            on:click={(e) =>
                (newObject = new model({
                    category: object,
                    [key]: object.id,
                }))}
        >
            <Icon icon="add" />
        </button>
    </div>
    {#if expand}
        <Nested {model} {property} {key} value={object.id} index={1} />
    {/if}
</li>
{#if newObject}
    <Modal class="panel" onClose={(e) => (newObject = null)}>
        <h2>{newObject.category[property]}</h2>
        <Form
            onSubmit={async () => {
                newObject = await newObject.create();
                newObject = null;
            }}
        >
            <Input title="Categoria" bind:value={newObject[property]} />
            <button type="submit">Agregar</button>
        </Form>
    </Modal>
{/if}
