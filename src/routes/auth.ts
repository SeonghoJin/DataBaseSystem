import { Request, Response, Router } from 'express';
import { AuthService } from '../service/AuthService.js';
import { v4 } from 'uuid'
import { AutoWired } from '../core/Ioc/decorator/Autowired.js';

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
        app.use('/auth', this.router);
        this.router.post('/login', (req: Request, res: Response) => {

            const email: string = req.body.email;
            if (this.authService.vaildEmail(email) === false) {
                return res
                    .status(200)
                    .json({ "errorCode": "vaildEmail" })
                    .send()
            }

            const sessionID: string = v4();

            res
                .status(200)
                .cookie("sessionID", sessionID, {
                    maxAge: 60 * 60 * 24
                })
                .json({
                    "sessionID": sessionID
                })
                .send()

        });

        this.router.post('/sign-up', (req: Request, res: Response) => {
            const id = req.body.id;
            const pw = req.body.password;

            // this.authService.Login(req, res);
            req.session._id = id;
            req.session.save();
            console.log(id, pw)
            res.cookie("sid", req.sessionID);
            res.redirect("/");
        })

        this.router.get('/test', async (req: Request, res: Response) => {
            res.redirect("/");
        })
    }
}
