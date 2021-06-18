import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config";
import { Zone } from "../domain/Zone";

interface ZoneRepository extends Repository<Zone> {
    findById(zid: number): Promise<Zone>;
    findAll(): Promise<Zone[]>
}

class ConcreteZoneRepository implements ZoneRepository {

    async findById(zid: number): Promise<Zone> {
        const item = await this.database.find({
            zid: zid
        });
        if (item.length === 0) {
            throw new Error(`${zid} no`)
        }
        return item[0];
    }

    async findAll(): Promise<Zone[]> {
        const items = await this.database.getAllData()
        items.filter((item: Zone) => {
            return item.zid !== undefined
        });
        return items;
    }

    @Connect(DBconfig)
    database: IDatabase;

}