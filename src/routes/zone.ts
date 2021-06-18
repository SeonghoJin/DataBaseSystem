import { Router } from "express";
import { AutoWired } from "jypescript";
import { ConcreteZoneRepository, ZoneRepository } from "../repository/ZoneRepository.js";

export default class zone {
    router: Router = Router();

    @AutoWired({
        class: ConcreteZoneRepository
    })
    zoneRepository: ZoneRepository;

    constructor(app: Router) {
        app.use('/zone', this.router);

        this.router.get("/:id", (req, res) => {
            res.redirect('/');
        })

    }
}