import { Service } from "@bluelibs/core";

@Service()
export class GQLService {
    public deepCleanTypename(data: any) {
        if (!(data instanceof Object)) return;

        if ("__typename" in data) {
            delete data["__typename"]
        }

        const deeperObjects = Object.keys(data).filter(key => data[key] instanceof Object).map(key => data[key])

        for (const object of deeperObjects) {
            this.deepCleanTypename(object)
        }
    }
}
