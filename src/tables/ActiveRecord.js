import { supabase } from "./Supabase"
export default class ActiveRecord {
    constructor({ created_at, id, ...object } = {}, assign = {}) {
        if (id) this.id = id
        if (created_at) this.created_at = new Date(created_at)
        Object.entries(object).forEach(([key, value]) => {
            if (value === null) return
            if (Array.isArray(value) && assign[key]) return this[key] = value.map(item => new assign[key](item))
            this[key] = assign[key] ? new assign[key](value) : value
        })
    }
    static async find(property = {}, properties = "*") {
        property = Object.entries(property).map(([key, value]) => `${key}.${value}`).join(",")
        const { data, error } = await supabase.from(this.table).select(properties).or(`and(${property})`).order("id").limit(1)
        if (error) throw error
        if (data[0]) return new this(data[0])
        return null
    }
    static async filter({ match = [], search = "", order = "id", ascending = true, page = 0 } = {}, { perPage = 10, select = "*", name = "" } = {}) {
        console.log("Estoy haciendo una peticion")
        const query = supabase.from(name || this.table).select(select, { count: "exact" })
        const or = this.getFilterString(match, search)
        console.log(or)
        if (or) query.or(or)
        let { data, error, count } = await query.order(order, { ascending }).range(page * perPage, perPage * (page + 1) - 1)
        if (error) {
            console.error(error)
            return null
        }
        data = data.map(record => new this(record))
        return { data, count }
    }
    static getFilterString(match, search) {
        match = match.filter(({ value }) => value).map(({ key, sign, value }) => [key, sign, value].filter(Boolean).join(".")).join(",")
        const searchString = this.searchProperties.map(name => `${name}.ilike.%${search}%`).join(',')
        if (search && match) return `and(or(${searchString}), ${match})`
        if (search) return `or(${searchString})`
        if (match) return `and(${match})`
        return ""
    }

    async create(select = "*") {
        let record = this.constructor.clean(structuredClone(this))
        const { data, error } = await supabase.from(this.constructor.table).insert([record]).select(select)
        if (error) console.error(error)
        record = new this.constructor(data[0])
        return record
    }
    async update(record, algo = "*") {
        const { data, error } = await supabase.from(this.constructor.table).update([record]).eq("id", this.id).select(algo)
        if (error) throw error
        return new this.constructor(data[0])
    }
    async upsert(select = "*") {
        let record = this.constructor.clean(structuredClone(this))
        const { data, error } = await supabase.from(this.constructor.table).upsert([record]).select(select)
        if (error) console.error(error)
        return new this.constructor(data[0])
    }
    delete() {
        return supabase.from(this.constructor.table).delete().eq("id", this.id)
    }
    static async create(array, select = "*") {
        let records = array.map(record => this.clean(structuredClone(record)))
        const { data, error } = await supabase.from(this.table).insert(records).select(select)
        if (error) console.error(error)
        records = data.map(record => new this(record))
        return records
    }
    static async upsert(records, select = "*") {
        records = records.map(record => this.clean(record))
        const { data, error } = await supabase.from(this.table).upsert(records).select(select)
        if (error) console.error(error)
        records = data.map(item => new this(item))
        return records
    }
    static async update(records, value, select = "*") {
        const { data, error } = await supabase.from(this.table).update(value).in("id", records.map(r => r.id)).select(select)
        if (error) console.error(error)
        records = data.map(item => new this(item))
        return records
    }
    static clean(record) {
        for (let [key, value] of Object.entries(record)) {
            if (!this.permit.includes(key) && typeof value === "object") delete record[key]
        }
        return record
    }
    static async uploadFile(file, path) {
        const extension = path + '.' + file.name.split(".").pop()
        await supabase.storage.from('contracts').upload(extension, file, { upsert: true })
        const { data, error } = supabase.storage.from('contracts').getPublicUrl(extension)
        if (error) throw error
        return data
    }
    static group(options, key) {
        return options.reduce((a, b) => {
            let algo = key
            if (typeof key == "function") { algo = key(b) }
            else { algo = b[key] }
            (a[algo] = a[algo] || []).push(b)
            return a
        }, {})
    }
    static searchProperties = []
    static permit = []
}