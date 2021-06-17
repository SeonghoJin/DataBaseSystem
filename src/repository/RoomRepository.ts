import { Repository, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Room } from "../domain/Room.js";

export interface RoomRepository extends Repository<Room> {
    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]>
    findRoomByIndex(RoomIndex: number): Promise<Room[]>
    insert(item: Room): Promise<void>
    getAllData(): Promise<any[]>
    update(query: any, updateQuery: any): Promise<void>
}

export class ConcreteRoomRepository implements RoomRepository {

    async update(query: string, updateQuery: string): Promise<void> {
        await this.database.update(query, updateQuery)
    }

    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]> {
        console.log(HomeIndex);
        return this.database.find({
            hid: HomeIndex
        });
    }

    async findRoomByIndex(RoomIndex: number): Promise<Room[]> {
        return await this.database.find({
            rid: RoomIndex
        });
    }

    async insert(item: Room): Promise<void> {
        await this.database.insert(item);
    }

    async getAllData(): Promise<Room[]> {
        let allData: any[] = await this.database.getAllData();
        allData = allData.filter((data) => {
            return data.rid !== undefined
        })
        return allData;
    }

    @Connect(DBconfig)
    database: IDatabase;

}