<script>
    export let record;
    const getInput = (record) => {
        if (
            record.subject ===
            "Fwd: Envío Automático - Constancia de Transferencia - Banca Móvil BCP"
        ) {
            return [
                { name: "Fecha", value: record.date.toLocaleString() },
                { name: "Operacion", value: record.operation },
                { name: "A", value: record.code },
                { name: "Nombre", value: record.client },
                { name: "Importe", value: "S/ " + record.value.toFixed(2) },
                {
                    name: "Comision",
                    value: "S/ " + record.commission.toFixed(2),
                },
                {
                    name: "Monto",
                    value:
                        "S/ " + (record.value + record.commission).toFixed(2),
                },
            ];
        }
        if (
            record.subject ===
            "Fwd: Envío Automático - Constancia de Giros Nacionales - BCP"
        ) {
            return [
                { name: "Fecha", value: record.date.toLocaleString() },
                {
                    name: "A favor de",
                    value: record.client + "\n" + record.code,
                },

                { name: "Monto giro", value: "S/ " + record.value.toFixed(2) },
                {
                    name: "Comision",
                    value: "S/ " + record.commission.toFixed(2),
                },
                {
                    name: "Total",
                    value:
                        "S/ " + (record.value + record.commission).toFixed(2),
                },
            ];
        }
        return [
            { name: "Fecha", value: record.date.toLocaleString() },
            { name: "Empresa", value: record.business },
            { name: "Codigo", value: record.code },
            { name: "Nombre", value: record.client },
            { name: "Servicio", value: record.service },
            { name: "Importe Pago", value: "S/ " + record.value.toFixed(2) },
            { name: "Cargo fijo", value: "S/ " + record.fixed.toFixed(2) },
            { name: "Mora", value: "S/ " + record.blackberry.toFixed(2) },
            { name: "Total deuda", value: "S/ " + record.total.toFixed(2) },
            { name: "Comision", value: "S/ " + record.commission.toFixed(2) },
            {
                name: "Total a pagar",
                value: "S/ " + (record.total + 1).toFixed(2),
            },
        ];
    };
</script>

<div id="print" style="width: 250px;">
    <h2 style="text-align: center">Quick Agente</h2>
    <p style="text-align: center; border-bottom: 1px dashed black;">
        {record.subject}
    </p>

    <section style="display: grid; grid-template-columns: 1fr 2fr">
        {#each getInput(record) as { name, value }}
            <span style="font-weight: 600;">{name}</span>
            <span style="text-align: right">{value}</span>
        {/each}
    </section>
</div>
