import ActiveRecord from "./ActiveRecord";
import { dateToInput, formToJson } from "../utils";

export default class Record extends ActiveRecord {
    constructor(record) {
        super(record, { date: Date })
    }
    static table = "records"
    static getFilterOptions(searchParams) {
        const params = formToJson(searchParams).filter || {}
        const start = new Date(params.match?.[0].value)
        const end = structuredClone(start)
        end.setDate(end.getDate() + 1)
        const filter = {
            search: params.search || "",
            page: 0,
            order: "id",
            ascending: true,
            match: [
                {
                    key: "date",
                    value: params.match?.[0].value && dateToInput(start),
                    sign: "gte",
                },
                {
                    key: "date",
                    value: params.match?.[0].value && dateToInput(end),
                    sign: "lt"
                }
            ]
        };
        return filter
    }
    static types = {
        search: { title: "Buscar" },
        match: [
            {
                value: { title: "Fecha", type: "date", update: true }
            }
        ]
    }
    static searchProperties = ["method", "others", "type"]
    static async updateRecords() {
        console.log("raton")
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxJozKHD_MiWlf4zMRXZyT-4aXf0Ndfs1Q3pYxgAPifg0uIrsYTB9sQApN_LcVsIzeVsA/exec"
        );
        const data = await response.json();
        const records = data.slice(0, 2).map(({ body, subject, ...rest }) => {
            return { ...this.#bcp(body, subject), subject, ...rest }
        })
        const algo = await this.upsert(records)
        console.log(algo)
    }
    static #bcp(body, subject) {
        if (subject === "Fwd: Envío Automático - Constancia de Transferencia - Banca Móvil BCP") {
            const data = [...body.matchAll(/<b>(.+)<\/b>/g)].map(([_, data]) => data)
            const type = "Deposito"
            const operation = data[2]
            const code = data[4] + data[5]
            const client = data[6]
            const value = parseFloat(data[10].slice(2, data[10].length))
            let commission = 0.5
            if (value >= 300) commission = 1
            if (value >= 1000) commission = 2

            return { type, code, client, value, operation, commission }
        } else if (subject = "Fwd: Envío Automático - Constancia de Giros Nacionales - BCP") {
            const data = [...body.matchAll(/<\/span>(.+)<\/td>/g)].map(([_, data]) => data)
            const operation = data[2]
            const client = data[4]
            console.log(data)
            const code = data[5]
            const type = "Giro nacional"
            const value = data[6].slice(2, data[6].length)
            const commission = parseFloat(data[7].slice(2, data[7].length)) + 1
            return { operation, client, code, commission, type, value }
        }
        else if (subject === "asdf") {
            const type = data[1] // Tipo de operacion
            const operation = data[2] // codigo de operacion
            const business = data[4] // Empresa
            const service = data[5] // Servicio
            const client = data[6] // Cliente
            const code = data[7] // Datos de la tarjeta
            const total = data[8].slice(2, data[8].length) // cortarlo
            const value = data[11].slice(2, data[12].length)
            const fixed = data[12].slice(2, data[12].length)
            const blackberry = data[13].slice(2, data[13].length)
            const commission = 1
            return { commission, type, operation, business, service, client, code, total, value, fixed, blackberry }
        }
        return {}

    }
    static #interbank(body = "") {
        const code = /<span>([0-9]+)<\/span>/g
        const value = /<span>(\d{1,3}(,\d{3})*(\.\d{2}))<\/span>/g
        const others = [...body.matchAll(/<span>([^<]+)<\/span>/g)].map(([_, data]) => data).join(",")
        return { code: code.exec(body)?.[1], value: value.exec(body)?.[1].replaceAll(",", ""), others }
    }
    static getTotal(records) {
        return records.reduce((a, b) => a + b.value, 0)
    }
}