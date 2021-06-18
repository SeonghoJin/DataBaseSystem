import { Router } from "express";
import { AutoWired, Connect, IDatabase } from "jypescript";
import { DBconfig } from "../config/index.js";
import { DangerZone } from "../domain/DangerZone.js";
import { Home } from "../domain/Home.js";
import { Room } from "../domain/Room.js";
import { CommentRepository, ConcreteCommentRepository } from "../repository/CommentRepository.js";
import { ConcreteDangerZoneRepository, DangerZoneRepository } from "../repository/DangerZoneRepository.js";
import { ConcreteHomeRepository, HomeRepository } from "../repository/HomeRepository.js";
import { ConcreteRoomRepository, RoomRepository } from "../repository/RoomRepository.js";
import { ConcreteUserRepository, UserRepository } from "../repository/UserRepository.js";
import { ConcreteZoneRepository, ZoneRepository } from "../repository/ZoneRepository.js";

export class admin {

    router: Router = Router();

    @AutoWired({
        class: ConcreteCommentRepository
    })
    commentRepository: CommentRepository

    @AutoWired({
        class: ConcreteZoneRepository
    })
    zoneRepository: ZoneRepository

    @AutoWired({
        class: ConcreteDangerZoneRepository
    })
    dangerZoneRepository: DangerZoneRepository

    @AutoWired({
        class: ConcreteHomeRepository
    })
    homeRepository: HomeRepository

    @AutoWired({
        class: ConcreteRoomRepository
    })
    roomRepository: RoomRepository

    @AutoWired({
        class: ConcreteUserRepository
    })
    userRepository: UserRepository

    @Connect(DBconfig)
    originDatabase: IDatabase

    constructor(app: Router) {
        app.use('/admin', this.router);

        this.router.get('', async (req, res) => {
            if (req.session.user?.name !== "admin") {
                res.redirect("/");
                return;
            }
            const comments = await this.commentRepository.findAll()
            const dangerzones = await this.dangerZoneRepository.findAll();
            const zones = await this.zoneRepository.findAll();
            const homes = await this.homeRepository.getAllData();
            const rooms = await this.roomRepository.getAllData();
            const users = await this.userRepository.findAll();

            let newDangerzones = dangerzones.map((dangerzone) => {
                const dzoneId = dangerzone.dangerZoneId;
                const zoneName = zones.find((zone) => {
                    return zone.zid === dzoneId;
                })?.name;
                return {
                    ...dangerzone,
                    zoneName
                }
            });

            res.render("admin", {
                user: req.session.user,
                users: users,
                comments: comments,
                homes: homes,
                rooms: rooms,
                dangerzones: newDangerzones
            });
        });

        this.router.delete("/id", (req, res) => {
            const id = req.fields?.id;
            this.originDatabase.remove({
                _id: id
            });
            res.sendStatus(200);
        })

        this.router.post("/dangerzone", async (req, res) => {
            const id = req.fields?.dangerZoneId;
            if ((await this.dangerZoneRepository.findById(Number(id))).length !== 0) {
                res.sendStatus(400);
                return;
            }

            await this.dangerZoneRepository.insert(new DangerZone({
                dangerZoneId: Number(id)
            }));

            res.sendStatus(200);
        })

        this.router.post("/home", async (req, res) => {
            const zid = req.fields?.zoneId;
            const title = req.fields?.title;
            const homeIndex = req.fields?.homeIndex;
            const description = req.fields?.description;

            if ((await this.homeRepository.findHomeByIndex(Number(homeIndex))).length !== 0) {
                res.sendStatus(400);
                return;
            }

            await this.homeRepository.insert(new Home({
                title: title?.toString(),
                zoneId: Number(zid),
                homeIndex: Number(homeIndex),
                description: description?.toString()
            }));

            res.sendStatus(200);
        });

        this.router.post("/room", async (req, res) => {
            const rid = req.fields?.rid;
            const hid = req.fields?.hid;
            const description = req.fields?.description;
            const price = req.fields?.price

            const home: Home = (await this.originDatabase.find({
                _id: hid
            }))[0];

            if ((await this.roomRepository.findRoomByIndex(Number(rid))).length !== 0) {
                res.sendStatus(400);
                return;
            }
            this.roomRepository.insert(new Room({
                rid: Number(rid),
                hid: Number(home.homeIndex),
                price: Number(price),
                description: description?.toString(),
                booker: undefined
            }))
            res.sendStatus(200);
        })
    }
}