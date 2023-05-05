<script>
    import { Record, Day } from "../../tables";

    //export let records;
    /* const archiveDay = async () => {
        let day = new Day({ total: Record.getTotal(records) });
        day = await day.create();
        await Record.update(records, { day_id: day.id });
        window.location.reload();
    }; */
</script>

<h1>Operaciones sin archivar</h1>

<div>
    <button on:click={(e) => Record.updateRecords()}> Probar </button>
</div>
<!-- <div class="grid auto-fill" style="gap: 1rem">
    <section class="panel">
        <h2>Invertido</h2>
        <p>S./ {Record.getTotal(records).toFixed(2)}</p>
    </section>
    <section class="panel">
        <h2>Operaciones totales</h2>
        <p>{records.length}</p>
    </section>
</div> -->
