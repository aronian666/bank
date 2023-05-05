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
        console.log("entro")
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxJozKHD_MiWlf4zMRXZyT-4aXf0Ndfs1Q3pYxgAPifg0uIrsYTB9sQApN_LcVsIzeVsA/exec"
        );
        const data = await response.json();
        const records = [data[0]].map(({ body, ...rest }) => {
            return { ...this.#bcp(body), ...rest }
        })
        console.log(records[0])
        const algo = await this.upsert([records[0]])

        //const algo = await this.upsert(records)
    }
    static #bcp(body) {
        const data = [...body.matchAll(/<b>(.+)<\/b>/g)].map(([_, data]) => data)
        const type = data[1]
        const operation = data[2]
        const business = data[4]
        const service = data[5]
        const client = data[6]
        const code = data[7]
        const total = data[8].slice(2, data[8].length) // cortarlo
        const value = data[11].slice(2, data[12].length)
        const fixed = data[12].slice(2, data[12].length)
        const blackberry = data[13].slice(2, data[13].length)
        return { type, operation, business, service, client, code, total, value, fixed, blackberry }
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