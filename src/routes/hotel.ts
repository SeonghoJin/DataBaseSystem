import { Router } from "express";
import { AutoWired } from "jypescript";
import { Home } from "../domain/Home";
import { Room } from "../domain/Room";
import { ConcreteHomeRepository, HomeRepository } from "../repository/HomeRepository.js";
import { ConcreteRoomRepository, RoomRepository } from "../repository/RoomRepository.js";

export default class hotel {
    router: Router = Router();

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteRoomRepository
    })
    roomRepository: RoomRepository

    constructor(app: Router) {
        app.use('/hotel', this.router);

        this.router.get('/:id', async (req, res) => {
            await this.roomRepository.getAllData()
            let home: Home[] | Home = (await this.homeRepository.findHomeByIndex(Number(req.params.id)))
            if (home.length === 0) {
                res.redirect('/');
                return;
            }
            home = home[0];
            const rooms: Room[] = (await this.roomRepository.findRoomByHomeIndex(home.homeIndex));
            res.render('hotel', {
                user: req.session.user,
                rooms: rooms
            });
        })

    }
}