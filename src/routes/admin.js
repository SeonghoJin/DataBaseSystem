var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Router } from "express";
import { AutoWired, Connect } from "jypescript";
import { DBconfig } from "../config/index.js";
import { DangerZone } from "../domain/DangerZone.js";
import { Home } from "../domain/Home.js";
import { Room } from "../domain/Room.js";
import { ConcreteCommentRepository } from "../repository/CommentRepository.js";
import { ConcreteDangerZoneRepository } from "../repository/DangerZoneRepository.js";
import { ConcreteHomeRepository } from "../repository/HomeRepository.js";
import { ConcreteRoomRepository } from "../repository/RoomRepository.js";
import { ConcreteUserRepository } from "../repository/UserRepository.js";
import { ConcreteZoneRepository } from "../repository/ZoneRepository.js";
var admin = /** @class */ (function () {
    function admin(app) {
        var _this = this;
        this.router = Router();
        app.use('/admin', this.router);
        this.router.get('', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var comments, dangerzones, zones, homes, rooms, users, newDangerzones;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name) !== "admin") {
                            res.redirect("/");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.commentRepository.findAll()];
                    case 1:
                        comments = _b.sent();
                        return [4 /*yield*/, this.dangerZoneRepository.findAll()];
                    case 2:
                        dangerzones = _b.sent();
                        return [4 /*yield*/, this.zoneRepository.findAll()];
                    case 3:
                        zones = _b.sent();
                        return [4 /*yield*/, this.homeRepository.getAllData()];
                    case 4:
                        homes = _b.sent();
                        return [4 /*yield*/, this.roomRepository.getAllData()];
                    case 5:
                        rooms = _b.sent();
                        return [4 /*yield*/, this.userRepository.findAll()];
                    case 6:
                        users = _b.sent();
                        newDangerzones = dangerzones.map(function (dangerzone) {
                            var _a;
                            var dzoneId = dangerzone.dangerZoneId;
                            var zoneName = (_a = zones.find(function (zone) {
                                return zone.zid === dzoneId;
                            })) === null || _a === void 0 ? void 0 : _a.name;
                            return __assign(__assign({}, dangerzone), { zoneName: zoneName });
                        });
                        res.render("admin", {
                            user: req.session.user,
                            users: users,
                            comments: comments,
                            homes: homes,
                            rooms: rooms,
                            dangerzones: newDangerzones
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.delete("/id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, type;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = (_a = req.fields) === null || _a === void 0 ? void 0 : _a.id;
                        type = (_b = req.fields) === null || _b === void 0 ? void 0 : _b.type;
                        if (!(type === "comment")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commentRepository.delete(id === null || id === void 0 ? void 0 : id.toString())];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(type === "user")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userRepository.delete(id === null || id === void 0 ? void 0 : id.toString())];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(type === "dangerZone")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.dangerZoneRepository.delete(Number(id === null || id === void 0 ? void 0 : id.toString()))];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 6:
                        if (!(type === "home")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.homeRepository.delete(Number(id))];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(type === "room")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.roomRepository.delete(Number(id))];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        res.sendStatus(400);
                        _c.label = 11;
                    case 11:
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/dangerzone", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (_a = req.fields) === null || _a === void 0 ? void 0 : _a.dangerZoneId;
                        return [4 /*yield*/, this.dangerZoneRepository.findById(Number(id))];
                    case 1:
                        if ((_b.sent()).length !== 0) {
                            res.sendStatus(400);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dangerZoneRepository.insert(new DangerZone({
                                dangerZoneId: Number(id)
                            }))];
                    case 2:
                        _b.sent();
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/home", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var zid, title, homeIndex, description;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        zid = (_a = req.fields) === null || _a === void 0 ? void 0 : _a.zoneId;
                        title = (_b = req.fields) === null || _b === void 0 ? void 0 : _b.title;
                        homeIndex = (_c = req.fields) === null || _c === void 0 ? void 0 : _c.homeIndex;
                        description = (_d = req.fields) === null || _d === void 0 ? void 0 : _d.description;
                        return [4 /*yield*/, this.homeRepository.findHomeByIndex(Number(homeIndex))];
                    case 1:
                        if ((_e.sent()).length !== 0) {
                            res.sendStatus(400);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.homeRepository.insert(new Home({
                                title: title === null || title === void 0 ? void 0 : title.toString(),
                                zoneId: Number(zid),
                                homeIndex: Number(homeIndex),
                                description: description === null || description === void 0 ? void 0 : description.toString()
                            }))];
                    case 2:
                        _e.sent();
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/room", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rid, hid, description, price, home;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        rid = (_a = req.fields) === null || _a === void 0 ? void 0 : _a.rid;
                        hid = (_b = req.fields) === null || _b === void 0 ? void 0 : _b.hid;
                        description = (_c = req.fields) === null || _c === void 0 ? void 0 : _c.description;
                        price = (_d = req.fields) === null || _d === void 0 ? void 0 : _d.price;
                        return [4 /*yield*/, this.homeRepository.findHomeByIndex(Number(hid))];
                    case 1:
                        home = (_e.sent())[0];
                        return [4 /*yield*/, this.roomRepository.findRoomByIndex(Number(rid))];
                    case 2:
                        if ((_e.sent()).length !== 0) {
                            res.sendStatus(400);
                            return [2 /*return*/];
                        }
                        this.roomRepository.insert(new Room({
                            rid: Number(rid),
                            hid: Number(home.homeIndex),
                            price: Number(price),
                            description: description === null || description === void 0 ? void 0 : description.toString(),
                            booker: undefined
                        }));
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    __decorate([
        AutoWired({
            class: ConcreteCommentRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "commentRepository", void 0);
    __decorate([
        AutoWired({
            class: ConcreteZoneRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "zoneRepository", void 0);
    __decorate([
        AutoWired({
            class: ConcreteDangerZoneRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "dangerZoneRepository", void 0);
    __decorate([
        AutoWired({
            class: ConcreteHomeRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "homeRepository", void 0);
    __decorate([
        AutoWired({
            class: ConcreteRoomRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "roomRepository", void 0);
    __decorate([
        AutoWired({
            class: ConcreteUserRepository
        }),
        __metadata("design:type", Object)
    ], admin.prototype, "userRepository", void 0);
    __decorate([
        Connect(DBconfig),
        __metadata("design:type", Object)
    ], admin.prototype, "originDatabase", void 0);
    return admin;
}());
export { admin };
