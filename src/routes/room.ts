import { Router } from "express";
import { AutoWired } from "jypescript";
import { Room } from "../domain/Room";
import { ConcreteHomeRepository, HomeRepository } from "../repository/HomeRepository.js";
import { ConcreteRoomRepository, RoomRepository } from "../repository/RoomRepository.js";

export default class room {

    router = Router();
    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteRoomRepository
    })
    roomRepository: RoomRepository


    constructor(app: Router) {
        app.use('/room', this.router);

        this.router.get('/:id', async (req, res) => {
            if (req.session.user === undefined || req.session.user?.isAuthenticated === false) {
                res.redirect('/');
                return;
            }
            let room: Room[] | Room = (await this.roomRepository.findRoomByIndex(Number(req.params.id)));
            if (room.length === 0) {
                res.redirect('/');
                return;
            }
            room = room[0];

            if (room.isReservation === true) {
                res.redirect('/');
                return;
            }

            await this.roomRepository.update({
                rid: room.rid
            }, {
                ...room,
                isReservation: true
            });

            res.render('index', {
                user: req.session.user,
                hotels: (await this.homeRepository.getAllData()),
                successReservation: true
            });
            res.status(200).send();
        })
    }

}