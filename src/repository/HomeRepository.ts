import { Repository, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Home } from "../domain/Home.js";
import mysql from "mysql2";

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

export class ConcreteMySQLHomeRepository implements HomeRepository{

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

    async delete(homeIndex: number): Promise<void> {
        return new Promise((res, rej) => {
            this.databasePool.query(`delete from home where hid = ${homeIndex}`,
                (err, rows, fields) => {
                    console.log("delete-home", err);
                    res();
                })
        })
    }

    async findByZoneIndex(zoneId: number): Promise<Home[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from home where zid = ${zoneId}`,
                (err, rows, fields) => {
                    console.log("findHomeByZoneIndex-home", err);
                    res(this.toHomeArray(rows as Array<any>));
                })
        })
    }

    async findHomeByIndex(homeIndex: number): Promise<Home[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from home where hid = ${homeIndex}`,
                (err, rows, fields) => {
                    console.log("findHomeByIndex-home", err);
                    res(this.toHomeArray(rows as Array<any>));
                })
        })
    }

    async getAllData(): Promise<any[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from home`,
                (err, rows, fields) => {
                    console.log("getAllData-home", err);
                    res(this.toHomeArray(rows as Array<any>));
                })
        })
    }

    async insert(item: Home): Promise<void> {
        return new Promise((res, rej) => {
            this.databasePool.query(`insert into home (hid,zid,title,description) values (${item.homeIndex}, ${item.zoneId}, "${item.title}", "${item.description}")`,
                (err, rows, fields) => {
                    console.log("insert-home", err);
                    res();
                })
        })
    }

    toHome(row : any){
        return new Home({
            homeIndex : row.hid,
            zoneId : row.zid,
            title : row.title,
            description : row.description
        });
    }

    toHomeArray(rows : any[]){
        return rows.map((row) => {
            return this.toHome(row);
        })
    }

}