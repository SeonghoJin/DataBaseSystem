import { Repository, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Room } from "../domain/Room.js";

export interface RoomRepository extends Repository<Room> {
    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]>
    findRoomByIndex(RoomIndex: number): Promise<Room[]>
    insert(item: Room): Promise<void>
    getAllData(): Promise<any[]>
}

export class ConcreteRoomRepository implements RoomRepository {

    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]> {
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