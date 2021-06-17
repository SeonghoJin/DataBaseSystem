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
import { Router } from 'express';
import { ConcreteHomeRepository } from '../repository/HomeRepository.js';
import { ConcreteRoomRepository } from '../repository/RoomRepository.js';
import { AuthService } from '../service/AuthService.js';
import auth from './auth.js';
import { SessionUser } from './SessionUser.js';
var router = Router();
new auth(router);
var authService = new AuthService();
var homeRepository = new ConcreteHomeRepository();
var roomRepository = new ConcreteRoomRepository();
// {"homeIndex":3,"description":"매우 좋습니당","roomCount":1,"title":"첫번째 집","_id":"JRLpH8fXQ2AgQObI"}
// {"homeIndex":2,"description":"매우 좋습니당","roomCount":2,"title":"두번째 집","_id":"bzRBa1KHX9Rudl6h"}
// {"homeIndex":1,"description":"매우 좋습니당","roomCount":1,"title":"첫번째 집","_id":"cM9DMYwKx4nEo5uP"}
// {"homeIndex":5,"description":"좋습니당","roomCount":3,"title":"다섯번째 집","_id":"oUuPFVYcxZRoz13K"}
// {"homeIndex":4,"description":"매우 좋습니당","roomCount":2,"title":"네번째 집","_id":"q82HonEdQI6Eqd8Z"}
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
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
                _b = (_a = res).render;
                _c = ['index'];
                _d = {
                    user: req.session.user
                };
                return [4 /*yield*/, homeRepository.getAllData()];
            case 1:
                _b.apply(_a, _c.concat([(_d.hotels = _e.sent(),
                        _d.successReservation = false,
                        _d)]));
                return [2 /*return*/];
        }
    });
}); });
router.get('/login', function (req, res) {
    res.render('login', {
        user: req.session.user
    });
});
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(req.fields === undefined)) return [3 /*break*/, 1];
                res.redirect('/');
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, authService.Login((_a = req.fields) === null || _a === void 0 ? void 0 : _a.name)];
            case 2:
                if (_c.sent()) {
                    req.session.user = new SessionUser({
                        name: (_b = req.fields) === null || _b === void 0 ? void 0 : _b.name,
                        isAuthenticated: true,
                        id: req.sessionID
                    });
                }
                _c.label = 3;
            case 3:
                req.session.save(function () {
                    res.redirect('/');
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/sign-up', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.fields === undefined)) return [3 /*break*/, 1];
                res.redirect('/');
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, authService.SignUp((_a = req.fields) === null || _a === void 0 ? void 0 : _a.name)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); });
router.get('/sign-up', function (req, res) {
    res.render('signup', {
        user: req.session.user,
    });
});
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
    });
    res.redirect('/');
});
router.get('/info', function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/');
        return;
    }
    res.render('info', {
        user: req.session.user
    });
});
router.get('/hotel/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var home, rooms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, homeRepository.findHomeByIndex(Number(req.params.id))];
            case 1:
                home = (_a.sent());
                if (home.length === 0) {
                    res.redirect('/');
                    return [2 /*return*/];
                }
                home = home[0];
                return [4 /*yield*/, roomRepository.findRoomByHomeIndex(home.homeIndex)];
            case 2:
                rooms = (_a.sent());
                res.render('hotel', {
                    user: req.session.user,
                    rooms: rooms
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/room/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var room, _a, _b, _c;
    var _d;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (req.session.user === undefined || ((_e = req.session.user) === null || _e === void 0 ? void 0 : _e.isAuthenticated) === false) {
                    res.redirect('/');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, roomRepository.findRoomByIndex(Number(req.params.id))];
            case 1:
                room = (_f.sent());
                if (room.length === 0) {
                    res.redirect('/');
                    return [2 /*return*/];
                }
                room = room[0];
                _b = (_a = res).render;
                _c = ['index'];
                _d = {
                    user: req.session.user
                };
                return [4 /*yield*/, homeRepository.getAllData()];
            case 2:
                _b.apply(_a, _c.concat([(_d.hotels = (_f.sent()),
                        _d.successReservation = true,
                        _d)]));
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); });
export default router;
