import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Comment } from "../domain/Comment.js";
import mysql from "mysql2";

export interface CommentRepository extends Repository<Comment> {
    findByhid(hcid: string): Promise<Comment[]>;
    insert(comment: Comment): Promise<void>;
    delete(cid: string | undefined): Promise<void>;
    findAll(): Promise<Comment[]>;
}

export class ConcreteCommentRepository implements CommentRepository {

    async findAll(): Promise<Comment[]> {
        return (await this.database.getAllData()).filter((data) => {
            return data.hcid !== undefined;
        });
    }

    async findByhid(hid: string): Promise<Comment[]> {
        return await this.database.find({
            hcid: hid
        })
    }
    async insert(comment: Comment): Promise<void> {
        await this.database.insert(comment);
    }

    async delete(cid: string | undefined): Promise<void> {
        await this.database.remove({
            cid: cid
        })
    }

    @Connect(DBconfig)
    database: IDatabase;

}

export class ConcreteMySQLCommentRepository implements CommentRepository{

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

    async delete(cid: string | undefined): Promise<void> {
            return new Promise((res, rej) => {
                this.databasePool.query(`delete from comment where cid = ${cid}`, (
                    err, rows, field
                ) => {
                    console.log("delete-comment", err);
                    res()
                })
            })
    }

    async findAll(): Promise<Comment[]> {
            return new Promise((res, rej) => {
                this.databasePool.query(`select * from comment`, (
                    err, rows, field
                ) => {
                    console.log("findAll-comment", err);
                    res(this.toCommentArray(rows as Array<any>));
                })
            })
        return Promise.resolve([]);
    }

    async findByhid(hcid: string): Promise<Comment[]> {
            return new Promise((res, rej) => {
                this.databasePool.query(`select * from comment where hid = ${Number(hcid)}`, (
                    err, rows, field
                ) => {
                    console.log("findByhid-commnet", err);
                    res(this.toCommentArray(rows as Array<any>))
                })
            })
    }

    async insert(comment: Comment): Promise<void> {
            return new Promise((res, rej) => {
                this.databasePool.query(`insert into comment
                    (uid,hid,value) values("${comment.uid}", ${comment.hcid}, "${comment.value}")`, (
                    err, rows, field
                ) => {
                    console.log("insert-comment", err);
                    res();
                })
            })
        return Promise.resolve(undefined);
    }

    toComment(row : any){
        return new Comment({
            cid:row.cid,
            hcid : row.hid,
            value : row.value,
            uid : row.uid
        });
    }

    toCommentArray(rows : any[]) {
        return rows.map((row) => {
            return this.toComment(row);
        })
    }

}
