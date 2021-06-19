import { Router } from "express";
import { AutoWired } from "jypescript";
import { Comment } from "../domain/Comment.js";
import {
    CommentRepository,
    ConcreteCommentRepository,
    ConcreteMySQLCommentRepository
} from "../repository/CommentRepository.js";

export default class comment {
    router: Router = Router();

    @AutoWired({
        class: ConcreteMySQLCommentRepository
    })
    commentRepository: CommentRepository;

    constructor(app: Router) {
        app.use('/comment', this.router);
        this.router.post('', async (req, res) => {
            if (req.session.user?.name === null) {
                res.sendStatus(400);
                return;
            };

            let comment = req.fields?.comment;
            let name = req.session.user?.name
            let hcid = req.fields?.hcid;
            if (Array.isArray(comment)) {
                comment = comment.join("");
            }
            if (Array.isArray(name)) {
                name = name.join("");
            }
            if (Array.isArray(hcid)) {
                hcid = hcid.join("");
            }
            await this.commentRepository.insert(new Comment({
                uid: name,
                value: comment,
                hcid: hcid,
            }));
            res.sendStatus(200);
        })

        this.router.delete('', async (req, res) => {
            let cid = req.fields?.cid;
            if (cid === undefined) {
                res.sendStatus(400);
                return;
            }
            if (Array.isArray(cid)) {
                cid = cid.join("");
            }
            await this.commentRepository.delete(cid);
            res.sendStatus(200);
        })

    }
}