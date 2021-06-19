import { Router } from "express";
import { AutoWired } from "jypescript";
import { Home } from "../domain/Home";
import { Room } from "../domain/Room";
import {ConcreteHomeRepository, ConcreteMySQLHomeRepository, HomeRepository} from "../repository/HomeRepository.js";
import { ConcreteRoomRepository, RoomRepository } from "../repository/RoomRepository.js";
import { HomeService } from "../service/HomeService.js";

export default class hotel {
    router: Router = Router();

    @AutoWired({
        class: ConcreteMySQLHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteRoomRepository
    })
    roomRepository: RoomRepository

    @AutoWired()
    homeService: HomeService;

    constructor(app: Router) {
        app.use('/hotel', this.router);

        this.router.get('/:id', async (req, res) => {
            let home: Home[] | Home = (await this.homeService.findByIndex(req.params.id));
            if (home.length === 0) {
                res.redirect('/');
                return;
            }
            home = home[0];
            const rooms: Room[] = (await this.roomRepository.findRoomByHomeIndex(Number(home.homeIndex)));
            res.render('hotel', {
                user: req.session.user,
                rooms: rooms,
                home: home
            });
        })

    }
}