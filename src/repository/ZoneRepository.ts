import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Zone } from "../domain/Zone";
import mysql from "mysql2";
import {User} from "../domain/User";

export interface ZoneRepository extends Repository<Zone> {
    findById(zid: number): Promise<Zone>;
    findAll(): Promise<Zone[]>;
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

export class ConcreteMySQLZoneRepository implements ZoneRepository{

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

    async findAll(): Promise<Zone[]> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from zone`, (
                err, rows, field
            ) => {
                console.log("findByAll-zone", err);
                res((rows as Array<Zone>));
            })
        })
    }

    async findById(zid: number): Promise<Zone> {
        return new Promise((res, rej) => {
            this.databasePool.query(`select * from zone where zid=${zid}`, (
                err, rows, field
            ) => {
                console.log("findById-zone", err);
                res((rows as Array<Zone>)[0]);
            })
        })
    }

}
