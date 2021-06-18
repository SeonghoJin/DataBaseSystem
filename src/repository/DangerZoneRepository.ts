import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { DangerZone } from "../domain/DangerZone.js";

export interface DangerZoneRepository extends Repository<DangerZone> {
    findAll(): Promise<DangerZone[]>;
    findById(dangerZoneId: number): Promise<DangerZone[]>;
    insert(dangerZone: DangerZone): Promise<void>;
}

export class ConcreteDangerZoneRepository implements DangerZoneRepository {

    async insert(dangerZone: DangerZone): Promise<void> {
        await this.database.insert(dangerZone);
    }

    async findAll(): Promise<DangerZone[]> {
        const items = await this.database.getAllData();
        return items.filter((item: DangerZone) => {
            return item.dangerZoneId !== undefined;
        });
    }

    async findById(dangerZoneId: number): Promise<DangerZone[]> {
        const item: DangerZone[] = await this.database.find({
            dangerZoneId: dangerZoneId
        });
        return item;
    }

    @Connect(DBconfig)
    database: IDatabase;
}
