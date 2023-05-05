<script>
    import Form from "./Form.svelte";

    import Inputs from "./Inputs.svelte";
    export let filter;
    export let types;
    export let objectName = "";
</script>

<Form class="flex" style="gap: 0.5rem;">
    <Inputs object={filter} {types} {objectName} />
</Form>
