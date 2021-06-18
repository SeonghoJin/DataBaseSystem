import { Connect, IDatabase, Repository } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Comment } from "../domain/Comment";

export interface CommentRepository extends Repository<Comment> {
    findByUid(uid: string): Promise<Comment[]>;
    insert(comment: Comment): Promise<void>;
    delete(cid: string): Promise<void>;
}

export class ConcreteCommentRepository implements CommentRepository {

    async findByUid(uid: string): Promise<Comment[]> {
        return await this.database.find({
            uid: uid,
        })
    }
    async insert(comment: Comment): Promise<void> {
        await this.database.insert(comment);
    }

    async delete(cid: string): Promise<void> {

    }

    @Connect(DBconfig)
    database: IDatabase;

}

