import { Router } from "express";
import { AutoWired } from "jypescript";
import { ConcreteHomeRepository, HomeRepository } from "../repository/HomeRepository.js";
import { ConcreteZoneRepository, ZoneRepository } from "../repository/ZoneRepository.js";

export default class zone {
    router: Router = Router();

    @AutoWired({
        class: ConcreteZoneRepository
    })
    zoneRepository: ZoneRepository;

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    constructor(app: Router) {
        app.use('/zone', this.router);

        this.router.get("/:id", async (req, res) => {
            const zid = req.params.id;
            const zoneName = await (await this.zoneRepository.findById(Number(zid))).name;
            const homes = await this.homeRepository.findByZoneIndex(Number(zid));
            res.render('index', {
                user: req.session.user,
                hotels: homes,
                successReservation: false,
                zoneName: zoneName
            })
        })

    }
}