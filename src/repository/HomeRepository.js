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
import { Connect } from "jypescript";
import { DBconfig } from "../config/index.js";
import { Home } from "../domain/Home.js";
import mysql from "mysql2";
var ConcreteHomeRepository = /** @class */ (function () {
    function ConcreteHomeRepository() {
    }
    ConcreteHomeRepository.prototype.delete = function (homeIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.database.remove({
                    homeIndex: homeIndex
                });
                return [2 /*return*/];
            });
        });
    };
    ConcreteHomeRepository.prototype.findByZoneIndex = function (zoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.find({
                            zoneId: zoneId
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ConcreteHomeRepository.prototype.getAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.getAllData()];
                    case 1:
                        allData = _a.sent();
                        allData = allData.filter(function (data) {
                            return (data.homeIndex !== undefined);
                        });
                        return [2 /*return*/, allData];
                }
            });
        });
    };
    ConcreteHomeRepository.prototype.insert = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.insert(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcreteHomeRepository.prototype.findHomeByIndex = function (homeIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.find({
                            homeIndex: homeIndex
                        })];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    __decorate([
        Connect(DBconfig),
        __metadata("design:type", Object)
    ], ConcreteHomeRepository.prototype, "database", void 0);
    return ConcreteHomeRepository;
}());
export { ConcreteHomeRepository };
var ConcreteMySQLHomeRepository = /** @class */ (function () {
    function ConcreteMySQLHomeRepository() {
        this.databasePool = mysql.createPool({
            host: DBconfig.host,
            user: DBconfig.user,
            database: DBconfig.name,
            password: DBconfig.password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    ConcreteMySQLHomeRepository.prototype.delete = function (homeIndex) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("delete from home where hid = " + homeIndex, function (err, rows, fields) {
                console.log("delete-home", err);
                res();
            });
        });
    };
    ConcreteMySQLHomeRepository.prototype.findByZoneIndex = function (zoneId) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from home where zid = " + zoneId, function (err, rows, fields) {
                console.log("findHomeByZoneIndex-home", err);
                res(_this.toHomeArray(rows));
            });
        });
    };
    ConcreteMySQLHomeRepository.prototype.findHomeByIndex = function (homeIndex) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from home where hid = " + homeIndex, function (err, rows, fields) {
                console.log("findHomeByIndex-home", err);
                res(_this.toHomeArray(rows));
            });
        });
    };
    ConcreteMySQLHomeRepository.prototype.getAllData = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from home", function (err, rows, fields) {
                console.log("getAllData-home", err);
                res(_this.toHomeArray(rows));
            });
        });
    };
    ConcreteMySQLHomeRepository.prototype.insert = function (item) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("insert into home (hid,zid,title,description) values (" + item.homeIndex + ", " + item.zoneId + ", \"" + item.title + "\", \"" + item.description + "\")", function (err, rows, fields) {
                console.log("insert-home", err);
                res();
            });
        });
    };
    ConcreteMySQLHomeRepository.prototype.toHome = function (row) {
        return new Home({
            homeIndex: row.hid,
            zoneId: row.zid,
            title: row.title,
            description: row.description
        });
    };
    ConcreteMySQLHomeRepository.prototype.toHomeArray = function (rows) {
        var _this = this;
        return rows.map(function (row) {
            return _this.toHome(row);
        });
    };
    return ConcreteMySQLHomeRepository;
}());
export { ConcreteMySQLHomeRepository };
