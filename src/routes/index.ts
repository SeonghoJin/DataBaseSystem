import { Request, Response, Router } from 'express';
import { Home } from '../domain/Home.js';
import { Room } from '../domain/Room.js';
import { ConcreteHomeRepository } from '../repository/HomeRepository.js';
import { ConcreteRoomRepository } from '../repository/RoomRepository.js';
import { AuthService } from '../service/AuthService.js';
import auth from './auth.js'
import { SessionUser } from './SessionUser.js';
const router = Router();
new auth(router);

const authService = new AuthService();

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

// {"homeIndex":3,"description":"매우 좋습니당","roomCount":1,"title":"첫번째 집","_id":"JRLpH8fXQ2AgQObI"}
// {"homeIndex":2,"description":"매우 좋습니당","roomCount":2,"title":"두번째 집","_id":"bzRBa1KHX9Rudl6h"}
// {"homeIndex":1,"description":"매우 좋습니당","roomCount":1,"title":"첫번째 집","_id":"cM9DMYwKx4nEo5uP"}
// {"homeIndex":5,"description":"좋습니당","roomCount":3,"title":"다섯번째 집","_id":"oUuPFVYcxZRoz13K"}
// {"homeIndex":4,"description":"매우 좋습니당","roomCount":2,"title":"네번째 집","_id":"q82HonEdQI6Eqd8Z"}

router.get('/', async (req, res) => {

    // roomRepository.insert(new Room({
    //     hid: 3,
    //     rid: 1,
    //     description: "3번째의 1번째",
    //     price: 85000
    // }));
    // roomRepository.insert(new Room({
    //     hid: 2,
    //     rid: 2,
    //     description: "2번째의 2번째",
    //     price: 65000
    // }));
    // roomRepository.insert(new Room({
    //     hid: 2,
    //     rid: 3,
    //     description: "2번째의 3번째",
    //     price: 55000
    // }));
    // roomRepository.insert(new Room({
    //     hid: 4,
    //     rid: 4,
    //     description: "4번째의 4번째",
    //     price: 45000
    // }));
    // roomRepository.insert(new Room({
    //     hid: 4,
    //     rid: 5,
    //     description: "4번째의 5번째",
    //     price: 35000
    // }));
    // roomRepository.insert(new Room({
    //     hid: 5,
    //     rid: 6,
    //     description: "5번째의 6번째",
    //     price: 1200
    // }));
    // roomRepository.insert(new Room({
    //     hid: 5,
    //     rid: 7,
    //     description: "5번째의 7번째",
    //     price: 500123
    // }));
    // roomRepository.insert(new Room({
    //     hid: 1,
    //     rid: 8,
    //     description: "1번째의 8번째",
    //     price: 50032
    // }));
    // roomRepository.insert(new Room({
    //     hid: 1,
    //     rid: 9,
    //     description: "1번째의 9번째",
    //     price: 2333
    // }));

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

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.session.user
    });
})


router.post('/login', async (req: Request, res: Response) => {
    if (req.fields === undefined) {
        res.redirect('/');
    }
    else {
        if (await authService.Login(req.fields?.name)) {
            req.session.user = new SessionUser({
                name: req.fields?.name,
                isAuthenticated: true,
                id: req.sessionID
            })
        }
    }

    req.session.save(() => {
        res.redirect('/');
    })
})

router.post('/sign-up', async (req: Request, res: Response) => {
    if (req.fields === undefined) {
        res.redirect('/');
    }
    else await authService.SignUp(req.fields?.name);
    res.redirect('/');
})

router.get('/sign-up', (req, res) => {
    res.render('signup', {
        user: req.session.user,
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
    });
    res.redirect('/');
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