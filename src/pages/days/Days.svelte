<script>
    import Table from "../../components/Table.svelte";
    import { Day } from "../../tables";

    export let days;
    //$: days = days.map((day) => new Day(day));
</script>

<Table array={days} header={["Dia", "Monto"]} let:item>
    <tr>
        <td>{item.created_at.toLocaleString()}</td>
        <td>{item.total}</td>
    </tr>
</Table>
