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
import { Router } from 'express';
import { AuthService } from '../service/AuthService.js';
import { AutoWired } from 'jypescript';
import { SessionUser } from './SessionUser.js';
var AuthRouter = /** @class */ (function () {
    function AuthRouter(app) {
        var _this = this;
        this.router = Router();
        app.use(this.router);
        this.router.get('/login', function (req, res) {
            res.render('login', {
                user: req.session.user
            });
        });
        this.router.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(req.fields === undefined)) return [3 /*break*/, 1];
                        res.redirect('/');
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authService.login((_a = req.fields) === null || _a === void 0 ? void 0 : _a.name, (_b = req.fields) === null || _b === void 0 ? void 0 : _b.password)];
                    case 2:
                        if (_d.sent()) {
                            req.session.user = new SessionUser({
                                name: (_c = req.fields) === null || _c === void 0 ? void 0 : _c.name,
                                isAuthenticated: true,
                                id: req.sessionID
                            });
                        }
                        _d.label = 3;
                    case 3:
                        req.session.save(function () {
                            res.redirect('/');
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/sign-up', function (req, res) {
            res.render('signup', {
                user: req.session.user,
            });
        });
        this.router.post('/sign-up', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var singup_check;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(req.fields === undefined)) return [3 /*break*/, 1];
                        res.redirect('/');
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authService.singUp((_a = req.fields) === null || _a === void 0 ? void 0 : _a.name, req.fields.password)];
                    case 2:
                        singup_check = _b.sent();
                        if (singup_check) {
                            res.redirect('/');
                        }
                        else {
                            console.log("회원가입 실패");
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/logout', function (req, res) {
            req.session.destroy(function (err) {
            });
            res.redirect('/');
        });
    }
    __decorate([
        AutoWired(),
        __metadata("design:type", AuthService)
    ], AuthRouter.prototype, "authService", void 0);
    return AuthRouter;
}());
export default AuthRouter;
