import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Comment } from "../domain/Comment";

export interface CommentRepository extends Repository<Comment> {
    findByhid(hcid: string): Promise<Comment[]>;
    insert(comment: Comment): Promise<void>;
    delete(cid: string): Promise<void>;
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

    async delete(cid: string): Promise<void> {
        await this.database.remove({
            _id: cid
        })
    }

    @Connect(DBconfig)
    database: IDatabase;

}

