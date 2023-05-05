import ActiveRecord from "./ActiveRecord"
import Record from "./Record"
export default class Day extends ActiveRecord {
    constructor(day) {
        super(day, { records: Record })
    }
    static table = "days"
}