import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Comment } from "../domain/Comment";

export interface CommentRepository extends Repository<Comment> {
    findByhid(hcid: string): Promise<Comment[]>;
    insert(comment: Comment): Promise<void>;
    delete(cid: string): Promise<void>;
}

export class ConcreteCommentRepository implements CommentRepository {

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

