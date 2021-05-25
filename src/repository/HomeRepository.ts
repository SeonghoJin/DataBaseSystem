import { DBconfig } from "../config";
import { Connect } from "../core/database/decorator/Connect";
import { IDatabase } from "../core/database/interface/IDataBase";
import { Repository } from "../core/database/repository/Repository";
import { Home } from "../domain/Home";

export interface HomeRepository extends Repository<Home> {

    findHomeByIndex(homeIndex: number): Promise<Home>
    insertHome(item: Home): Promise<void>
}

export class ConcreteHomeRepository implements HomeRepository {

    async insertHome(item: Home): Promise<void> {
        await this.database.insert({
            homeIndex: item.homeIndex
        })
    }

    async findHomeByIndex(homeIndex: number): Promise<Home> {
        const item: Home = await this.database.find({
            homeIndex: homeIndex
        })
        return item;
    }


    @Connect(DBconfig)
    database: IDatabase;

}