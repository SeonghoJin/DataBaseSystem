import { Router } from 'express';
import { Home } from '../domain/Home.js';
import { Room } from '../domain/Room.js';
import { ConcreteHomeRepository } from '../repository/HomeRepository.js';
import { ConcreteRoomRepository } from '../repository/RoomRepository.js';
import Auth from './auth.js'
import { SessionUser } from './SessionUser.js';
const router = Router();
new Auth(router);

const homeRepository = new ConcreteHomeRepository();
const roomRepository = new ConcreteRoomRepository();

declare module 'express-session' {
    interface SessionData {
        user: SessionUser | null
    }
}

declare module 'formidable' {
    interface Field {
        name: string
    }
}

router.get('/', async (req, res) => {

    req.session.user = req.session.user ? req.session.user : new SessionUser({
        name: null,
        id: req.sessionID,
        isAuthenticated: false
    });

    req.session.save();
    res.render('index', {
        user: req.session.user,
        hotels: await homeRepository.getAllData(),
        successReservation: false
    })
})

router.get('/info', (req, res) => {
    if (req.session.user === undefined) {
        res.redirect('/');
        return;
    }

    res.render('info', {
        user: req.session.user
    })
})

router.get('/hotel/:id', async (req, res) => {

    let home: Home[] | Home = (await homeRepository.findHomeByIndex(Number(req.params.id)))
    if (home.length === 0) {
        res.redirect('/');
        return;
    }
    home = home[0];
    const rooms: Room[] = (await roomRepository.findRoomByHomeIndex(home.homeIndex));
    res.render('hotel', {
        user: req.session.user,
        rooms: rooms
    });
})

router.get('/room/:id', async (req, res) => {
    if (req.session.user === undefined || req.session.user?.isAuthenticated === false) {
        res.redirect('/');
        return;
    }
    let room: Room[] | Room = (await roomRepository.findRoomByIndex(Number(req.params.id)));
    if (room.length === 0) {
        res.redirect('/');
        return;
    }
    room = room[0];
    res.render('index', {
        user: req.session.user,
        hotels: (await homeRepository.getAllData()),
        successReservation: true
    });
    res.status(200).send();
})
export default router;