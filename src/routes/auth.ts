import { Request, Response, Router } from 'express';
import { AuthService } from '../service/AuthService.js';
import { AutoWired } from 'jypescript';
import { SessionUser } from './SessionUser.js';

declare module 'express-session' {
    interface SessionData {
        _id: string,
    }
}

declare module 'formidable' {
    interface Field {
        name: string
    }
}

export default class AuthRouter {

    router: Router = Router();

    @AutoWired()
    authService: AuthService;

    constructor(app: Router) {

        app.use(this.router);

        this.router.get('/login', (req, res) => {
            res.render('login', {
                user: req.session.user
            });
        })

        this.router.post('/login', async (req: Request, res: Response) => {

            if (req.fields === undefined) {
                res.redirect('/');
            }
            else {
                if (await this.authService.login(req.fields?.name, req.fields?.password)) {

                    req.session.user = new SessionUser({
                        name: req.fields?.name,
                        isAuthenticated: true,
                        id: req.sessionID
                    })
                }
            }

            req.session.save(() => {
                res.redirect('/');
            });

        });

        this.router.get('/sign-up', (req, res) => {
            res.render('signup', {
                user: req.session.user,
            });
        })

        this.router.post('/sign-up', async (req: Request, res: Response) => {
            if (req.fields === undefined) {
                res.redirect('/');
            }
            else if (req.fields?.password !== req.fields?.password_check) {
                res.redirect('/');
            }
            else {
                const singup_check = await this.authService.singUp(req.fields?.name, req.fields.password);
                if (singup_check) {
                    res.redirect('/');
                } else {
                    console.log("회원가입 실패");
                }
            }
        })

        this.router.get('/logout', (req, res) => {
            req.session.destroy((err) => {
            });
            res.redirect('/');
        })
    }
}
