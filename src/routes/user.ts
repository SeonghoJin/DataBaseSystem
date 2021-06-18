import { Router } from "express";
import { AutoWired } from "jypescript";
import { Room } from "../domain/Room.js";
import { ConcreteRoomRepository, RoomRepository } from "../repository/RoomRepository.js";

export default class user {

    router: Router = Router();

    @AutoWired({
        class: ConcreteRoomRepository
    })
    roomRepository: RoomRepository

    constructor(app: Router) {

        app.use('/user', this.router);

        this.router.get('/:name', async (req, res) => {
            const name = req.params.name;
            if (req.session.user?.name !== name) {
                res.redirect('/');
                return;
            }
            let rooms = await this.roomRepository.getAllData();
            rooms = rooms.filter((room: Room) => {
                return room.booker === name
            });
            res.render("info", {
                user: req.session.user,
                rooms: rooms
            })
        });
    }
}