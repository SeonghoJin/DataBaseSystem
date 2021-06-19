import { Repository, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Room } from "../domain/Room.js";
import mysql from "mysql2";

export interface RoomRepository extends Repository<Room> {
    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]>
    findRoomByIndex(RoomIndex: number): Promise<Room[]>
    insert(item: Room): Promise<void>
    getAllData(): Promise<any[]>
    update(query: any, updateQuery: any): Promise<void>
    delete(RoomIndex: number): Promise<void>;
}

export class ConcreteRoomRepository implements RoomRepository {

    async delete(RoomIndex: number): Promise<void> {
        this.database.remove({
            rid: RoomIndex
        })
    }

    async update(query: any, updateQuery: any): Promise<void> {
        await this.database.update(query, updateQuery)
    }

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

export class ConcreteMySQLRoomRepository implements RoomRepository{

    database: IDatabase;
    databasePool = mysql.createPool({
        host: DBconfig.host,
        user: DBconfig.user,
        database : DBconfig.name,
        password : DBconfig.password,
        waitForConnections : true,
        connectionLimit : 10,
        queueLimit : 0
    });

    delete(RoomIndex: number): Promise<void> {
            return new Promise((res, rej) => {
                this.databasePool.query(`delete from room where rid = ${RoomIndex}`, (
                    err, rows, field
                ) => {
                    console.log("delete-room", err);
                    res();
                })
            })
        return Promise.resolve(undefined);
    }

    findRoomByHomeIndex(HomeIndex: number): Promise<Room[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from room where hid = ${HomeIndex}`, (
                err, rows, field
            ) => {
                console.log("findRoomByHomeIndex-room", err);
                res(this.toRoomArray(rows as Array<any>));
            })
        })
    }

    findRoomByIndex(RoomIndex: number): Promise<Room[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from room where rid = ${RoomIndex}`, (
                err, rows, field
            ) => {
                console.log("findRoomByIndex-room", err);
                res(this.toRoomArray(rows as Array<any>));
            })
        })
    }

    getAllData(): Promise<any[]> {
            return new Promise((res, rej) => {
                this.databasePool.query(`select * from room`, (
                    err, rows, field
                ) => {
                    console.log("getAllData-room", err);
                    res(this.toRoomArray(rows as Array<any>));
                })
            })
    }

    insert(item: Room): Promise<void> {
            return new Promise((res, rej) => {
                this.databasePool.query(`insert into room (rid, hid, description, price, booker) 
                    values(${item.rid}, ${item.hid}, "${item.description}", ${item.price}, NULL)`, (
                    err, rows, field
                ) => {
                    console.log("insert-room", err);
                    res();
                })
            })
    }

    async update(query: any, updateQuery: Room): Promise<void> {
            return new Promise((res, rej) => {
                this.databasePool.query(`update room set booker = "${updateQuery.booker}"`, (
                    err, rows, field
                ) => {
                    console.log("update-room", err);
                    res();
                })
            })
    }

    toRoom(row : any){
        return new Room({
            hid : row.hid,
            rid : row.rid,
            description : row.description,
            price : row.price,
            booker : row.booker === null ? undefined : row.booker
        });
    }

    toRoomArray(rows : any[]){
        return rows.map((row) => {
            return this.toRoom(row);
        })
    }
}