import { Router } from "express";

export default class user {

    router: Router = Router();


    constructor(app: Router) {

        app.use('/user', this.router);

        this.router.get('/:id', async (req, res) => {

        });
    }
}