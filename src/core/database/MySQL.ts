import { IDatabase } from "./interface/IDataBase";
import mysql from 'mysql2';
import { IDBconfig } from "./interface/DBconfig";
import { Bean } from "../Ioc/decorator/Bean.js";

export class MySQL implements IDatabase {

    private connection;

    constructor(config: IDBconfig) {
        this.connection = mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        })
    }
    getAllData(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    find(query: any): Promise<any[]> {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    }
    insert(data: any): Promise<void> {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    }
}