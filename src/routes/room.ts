import { Router } from "express";
import { AutoWired } from "jypescript";
import { Room } from "../domain/Room";
import {ConcreteHomeRepository, ConcreteMySQLHomeRepository, HomeRepository} from "../repository/HomeRepository.js";
import {ConcreteMySQLRoomRepository, ConcreteRoomRepository, RoomRepository} from "../repository/RoomRepository.js";

export default class room {

    router = Router();
    @AutoWired({
        class: ConcreteMySQLHomeRepository
    })
    homeRepository: HomeRepository;

    @AutoWired({
        class: ConcreteMySQLRoomRepository
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

            await this.roomRepository.update({
                rid: room.rid
            }, {
                ...room,
                booker: req.session.user?.name
            });

            res.redirect("/");
        });

        this.router.delete("/:id", async (req, res) => {
            const id = req.params.id;
            let room: Room[] | Room = await this.roomRepository.findRoomByIndex(Number(id));
            if (room.length === 0) {
                res.redirect('/');
                return;
            }
            room = room[0];
            await this.roomRepository.update({
                rid: room.rid
            }, {
                ...room,
                booker: undefined
            })
            res.sendStatus(200);
        })
    }

}