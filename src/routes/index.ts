import { Request, Response, Router } from 'express';
import { User } from '../domain/User.js';
import {
    AuthService
} from '../service/AuthService.js';
import auth from './auth.js'
import { SessionUser } from './SessionUser.js';
const router = Router();
new auth(router);

const authService = new AuthService();

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


router.get('/', (req, res) => {

    req.session.user = req.session.user ? req.session.user : new SessionUser({
        name: null,
        id: req.sessionID,
        isAuthenticated: false
    });

    req.session.save();
    res.render('index', {
        user: req.session.user,
        hotelCount: 5
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

router.get('/hotel/:id', (req, res) => {
    res.render('hotel', {
        user: req.session.user,
        hotelIndex: 1
    });
})

export default router;