import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { DangerZone } from "../domain/DangerZone.js";
import mysql from "mysql2";

export interface DangerZoneRepository extends Repository<DangerZone> {
    findAll(): Promise<DangerZone[]>;
    findById(dangerZoneId: number): Promise<DangerZone[]>;
    insert(dangerZone: DangerZone): Promise<void>;
    delete(dangerZoneId: number): Promise<void>;
}

export class ConcreteDangerZoneRepository implements DangerZoneRepository {
    async delete(dangerZoneId: number): Promise<void> {
        this.database.remove({
            dangerZoneId: dangerZoneId
        });
    }

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

export class ConcreteMySQLDangerZoneRepository implements DangerZoneRepository{

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

    async delete(dangerZoneId: number): Promise<void> {
        return new Promise((res, rej) => {
            this.databasePool.query(`delete from dangerzone where dzid = ${dangerZoneId}`, (
                err, rows, field
            ) => {
                console.log("delete-dangerzone", err);
                res();
            })
        })
    }

    async findAll(): Promise<DangerZone[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from dangerzone`, (
                err, rows, field
            ) => {
                console.log("findAll-dangerzone", err);
                res(this.toDangerZoneArray((rows) as Array<any>));
            })
        })
    }

    async findById(dangerZoneId: number): Promise<DangerZone[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from dangerzone where dzid = ${dangerZoneId}`, (
                err, rows, field
            ) => {
                console.log("findbyId-dangerzone", err);
                res(this.toDangerZoneArray((rows as Array<any>)));
            })
        })
    }

    async insert(dangerZone: DangerZone): Promise<void> {
        return new Promise((res, rej) => {
            this.databasePool.query(`insert into dangerzone (dzid) values (${dangerZone.dangerZoneId})`, (
                err, rows, field
            ) => {
                console.log("insert-dangerzone", err);
                res();
            })
        })
        return Promise.resolve(undefined);
    }

    toDangerZone(row : any){
        return new DangerZone({
            dangerZoneId : row.dzid
        })
    }

    toDangerZoneArray(rows : any[]){
        return rows.map((row) => {
            return this.toDangerZone(row);
        });
    }
}
