import { Repository, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Home } from "../domain/Home.js";

export interface HomeRepository extends Repository<Home> {

    findHomeByIndex(homeIndex: number): Promise<Home[]>
    findByZoneIndex(zoneId: number): Promise<Home[]>
    insert(item: Home): Promise<void>
    getAllData(): Promise<any[]>
    delete(homeIndex: number): Promise<void>;
}

export class ConcreteHomeRepository implements HomeRepository {
    async delete(homeIndex: number): Promise<void> {
        this.database.remove({
            homeIndex: homeIndex
        });
    }

    async findByZoneIndex(zoneId: number): Promise<Home[]> {
        let data: Home[] = await this.database.find({
            zoneId: zoneId
        });
        return data;
    }

    async getAllData(): Promise<any[]> {
        let allData: any[] = await this.database.getAllData();
        allData = allData.filter((data) => {
            return (data.homeIndex !== undefined);
        })
        return allData;
    }

    async insert(item: Home): Promise<void> {
        await this.database.insert(item);
    }

    async findHomeByIndex(homeIndex: number): Promise<Home[]> {
        const item: Home[] = await this.database.find({
            homeIndex: homeIndex
        })
        return item;
    }

    @Connect(DBconfig)
    database: IDatabase;

}