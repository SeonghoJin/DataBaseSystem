import { Router } from 'express';
import { HomeService } from '../service/HomeService.js';
import Auth from './auth.js'
import hotel from './hotel.js';
import room from './room.js';
import { SessionUser } from './SessionUser.js';

const router = Router();
new Auth(router);
new hotel(router);
new room(router);

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
    res.render('index', {
        user: req.session.user,
        hotels: await homeService.getAllHome(),
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

export default router;