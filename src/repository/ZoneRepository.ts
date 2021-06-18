import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Zone } from "../domain/Zone";

export interface ZoneRepository extends Repository<Zone> {
    findById(zid: number): Promise<Zone>;
    findAll(): Promise<Zone[]>;
    insert(zone: Zone): Promise<void>;
}

export class ConcreteZoneRepository implements ZoneRepository {

    async insert(zone: Zone): Promise<void> {
        await this.database.insert(zone);
    }

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
        return items.filter((item: Zone) => {
            return item.zid !== undefined
        });
    }

    @Connect(DBconfig)
    database: IDatabase;

}