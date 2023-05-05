<script>
    import { Table, Modal } from "../components";
    import { Record } from "../tables";

    export let records;
    $: recordsModel = records.map((record) => new Record(record));
    let record;
    const getInput = (record) => {
        const inputs = [
            { name: "Empresa", value: record.busines },
            { name: "Codigo", value: record.code },
            { name: "Nombre", value: record.client },
            { name: "Servicio", value: record.service },
            { name: "Importe Pago", value: record.value },
            { name: "Cargo fijo", value: record.fixed },
            { name: "Mora", value: record.blackberry },
            { name: "Total deuda", value: record.total },
            { name: "Comision", value: "1.00" },
            { name: "Total a pagar", value: record.total },
        ];
    };
</script>

<Table
    header={["Codigo", "Banco", "Fecha", "Tipo", "Monto"]}
    array={recordsModel}
    let:item
>
    <tr>
        <td>{item.code}</td>
        <td>{item.method}</td>
        <td>{item.date.toLocaleString()}</td>
        <td>{item.type}</td>
        <td>{item.value}</td>
        <td>
            <a href="/records/{item.id}">Imprimir</a>
        </td>
    </tr>
    <tfoot slot="tfoot">
        <tr>
            <td colspan="4">Total</td>
            <td>{Record.getTotal(recordsModel)}</td>
        </tr>
    </tfoot>
</Table>

{#if record}
    <Modal>
        <h1>AGENTE MULTISERICIOS</h1>
        <section>
            {#each getInput(record) as { name, value }}
                <span>{name}</span>
                <span>{value}</span>
            {/each}
        </section>
    </Modal>
{/if}

<style>
    section {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
