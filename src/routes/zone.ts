import { Router } from "express";
import { AutoWired } from "jypescript";
import { ConcreteHomeRepository, HomeRepository } from "../repository/HomeRepository.js";
import {ConcreteMySQLZoneRepository, ConcreteZoneRepository, ZoneRepository} from "../repository/ZoneRepository.js";
import { HomeService } from "../service/HomeService.js";

export default class zone {
    router: Router = Router();

    @AutoWired()
    homeService: HomeService;

    constructor(app: Router) {
        app.use('/zone', this.router);

        this.router.get("/:id", async (req, res) => {
            const zid = req.params.id;
            res.render('index', {
                user: req.session.user,
                hotels: await this.homeService.getHomeByZoneIndex(zid),
                successReservation: false,
            })
        })

    }
}