import { Router } from 'express';
import { HomeService } from '../service/HomeService.js';
import { admin } from './admin.js';
import Auth from './auth.js'
import comment from './comment.js';
import hotel from './hotel.js';
import room from './room.js';
import { SessionUser } from './SessionUser.js';
import user from './user.js';
import zone from './zone.js';

const router = Router();
new Auth(router);
new hotel(router);
new room(router);
new user(router);
new zone(router);
new comment(router);
new admin(router);
const homeService: HomeService = new HomeService();

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

    if (req.session.user.name === "admin") {
        res.redirect('/admin');
        return;
    }

    res.render('index', {
        user: req.session.user,
        hotels: await homeService.getAllHome(),
        successReservation: false,
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


export default router;