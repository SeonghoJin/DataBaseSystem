import { Repository, Bean, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { User } from "../domain/User.js";
import mysql, {RowDataPacket} from 'mysql2'

export interface UserRepository extends Repository<User> {

    getUserById(id: string): Promise<User[]>;
    exist(id: string, password: string): Promise<boolean>;
    insert(user: User): Promise<void>;
    findAll(): Promise<any>
    delete(id: string | undefined): Promise<void>;
}

export class ConcreteUserRepository implements UserRepository {

    @Connect(DBconfig)
    database: IDatabase;

    constructor() {
    }
    async delete(id: string | undefined): Promise<void> {
        this.database.remove({
            id: id
        })
    }
    async findAll(): Promise<any> {
        return (await this.database.getAllData()).filter((user) => {
            return user.id !== undefined && user.password !== undefined
        })
    }
    async getUserById(id: string): Promise<User[]> {
        return this.database.find({ id: id });
    }

    async exist(id: string, password: string): Promise<boolean> {
        const user: User[] = await this.database.find({ id: id, password: password });
        return user.length !== 0;
    }

    async insert(user: User): Promise<void> {
        return this.database.insert(user);
    }
}

export class ConcreteMySQLUserRepository implements UserRepository{

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

    async delete(id: string | undefined): Promise<void> {
        return new Promise((res, rej) => {
            this.databasePool.query(`delete from user where id = "${id}"`,
                (err, rows, field) => {
                console.log("user-delete", err);
                res();
                })
        })
    }

    async exist(id: string, password: string): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
             this.databasePool.query(`select * from user where id="${id}" and password="${password}"`,
                (err, rows, field) => {
                    console.log("user-exist", err);
                    if(Array.isArray(rows)){
                        res(rows.length !== 0)
                    }
                    else {
                        res(false);
                    }
                })
        });
    }

    async findAll(): Promise<any> {
        return new Promise<any>((res, rej) => {
            this.databasePool.query(`select * from user`,
                (err, rows, field) => {
                    console.log("user-findAll",err);
                    res(rows);
                })
        })
    }

    async getUserById(id: string): Promise<User[]> {
        return new Promise<User[]>((res, rej) => {
            this.databasePool.query(`select * from user where id = "${id}"`,
                (err, rows, field) => {
                    console.log("user-getUserById", err);
                    console.log(rows);
                    res(rows as User[]);
                })
        })
    }

    async insert(user: User): Promise<void> {
        return new Promise<void>((res, rej) => {
            this.databasePool.query(`insert into user (id, password) values ("${user.id}", "${user.password}")`,
                (err, rows, field) => {
                    console.log("user-insert", err);
                    res();
                });
        })
    }
}
