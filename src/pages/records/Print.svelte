<script>
    export let record;
    const inputs = [
        { name: "Empresa", value: record.business },
        { name: "Codigo", value: record.code },
        { name: "Nombre", value: record.client },
        { name: "Servicio", value: record.service },
        { name: "Importe Pago", value: record.value },
        { name: "Cargo fijo", value: record.fixed },
        { name: "Mora", value: record.blackberry },
        { name: "Total deuda", value: record.total },
        { name: "Comision", value: "1.00" },
        { name: "Total a pagar", value: record.total + 1 },
    ];
</script>

<div>
    <h1>Agente</h1>
    <section>
        {#each inputs as { name, value }}
            <span>{name}</span>
            <span>{value}</span>
        {/each}
    </section>
</div>

<style>
    div {
        width: 250px;
    }
    section {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
