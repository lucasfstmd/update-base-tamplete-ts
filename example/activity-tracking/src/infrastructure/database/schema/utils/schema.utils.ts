export class SchemaUtils {
    /**
     * Builds nested parameters of an update correctly.
     *
     * @param obj
     * @param newObj
     * @param prefix
     * @return {any}
     */
    public static buildNestedParameters(obj: any, newObj= {}, prefix= ''): any {
        for (const key of Object.keys(obj)) {
            if (obj[key] instanceof Object && !(obj[key] instanceof Array)) {
                this.buildNestedParameters(obj[key], newObj, `${prefix}${key}.`)
            } else if (obj[key] !== undefined) {
                newObj[`${prefix}${key}`] = obj[key]
            }
        }
        return newObj
    }
}
