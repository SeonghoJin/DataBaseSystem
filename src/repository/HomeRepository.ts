import { DBconfig } from "../config/index.js";
import { Connect } from "../core/database/decorator/Connect.js";
import { IDatabase } from "../core/database/interface/IDataBase.js";
import { Repository } from "../core/database/repository/Repository.js";
import { Home } from "../domain/Home.js";

export interface HomeRepository extends Repository<Home> {

    findHomeByIndex(homeIndex: number): Promise<Home[]>
    insert(item: Home): Promise<void>
    getAllData(): Promise<any[]>
}

export class ConcreteHomeRepository implements HomeRepository {

    async getAllData(): Promise<any[]> {
        let allData: any[] = await this.database.getAllData();
        allData = allData.filter((data) => {
            return (data.homeIndex !== undefined);
        })
        return allData;
    }

    async insert(item: Home): Promise<void> {
        await this.database.insert({
            homeIndex: item.homeIndex,
            description: item.description,
            title: item.title
        })
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