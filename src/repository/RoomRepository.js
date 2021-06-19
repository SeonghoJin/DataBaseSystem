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
import { Room } from "../domain/Room.js";
import mysql from "mysql2";
var ConcreteRoomRepository = /** @class */ (function () {
    function ConcreteRoomRepository() {
    }
    ConcreteRoomRepository.prototype.delete = function (RoomIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.database.remove({
                    rid: RoomIndex
                });
                return [2 /*return*/];
            });
        });
    };
    ConcreteRoomRepository.prototype.update = function (query, updateQuery) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.update(query, updateQuery)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcreteRoomRepository.prototype.findRoomByHomeIndex = function (HomeIndex) {
        return this.database.find({
            hid: HomeIndex
        });
    };
    ConcreteRoomRepository.prototype.findRoomByIndex = function (RoomIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.find({
                            rid: RoomIndex
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConcreteRoomRepository.prototype.insert = function (item) {
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
    ConcreteRoomRepository.prototype.getAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.getAllData()];
                    case 1:
                        allData = _a.sent();
                        allData = allData.filter(function (data) {
                            return data.rid !== undefined;
                        });
                        return [2 /*return*/, allData];
                }
            });
        });
    };
    __decorate([
        Connect(DBconfig),
        __metadata("design:type", Object)
    ], ConcreteRoomRepository.prototype, "database", void 0);
    return ConcreteRoomRepository;
}());
export { ConcreteRoomRepository };
var ConcreteMySQLRoomRepository = /** @class */ (function () {
    function ConcreteMySQLRoomRepository() {
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
    ConcreteMySQLRoomRepository.prototype.delete = function (RoomIndex) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("delete from room where rid = " + RoomIndex, function (err, rows, field) {
                console.log("delete-room", err);
                res();
            });
        });
        return Promise.resolve(undefined);
    };
    ConcreteMySQLRoomRepository.prototype.findRoomByHomeIndex = function (HomeIndex) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from room where hid = " + HomeIndex, function (err, rows, field) {
                console.log("findRoomByHomeIndex-room", err);
                res(_this.toRoomArray(rows));
            });
        });
    };
    ConcreteMySQLRoomRepository.prototype.findRoomByIndex = function (RoomIndex) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from room where rid = " + RoomIndex, function (err, rows, field) {
                console.log("findRoomByIndex-room", err);
                res(_this.toRoomArray(rows));
            });
        });
    };
    ConcreteMySQLRoomRepository.prototype.getAllData = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("select * from room", function (err, rows, field) {
                console.log("getAllData-room", err);
                res(_this.toRoomArray(rows));
            });
        });
    };
    ConcreteMySQLRoomRepository.prototype.insert = function (item) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.databasePool.query("insert into room (rid, hid, description, price, booker) \n                    values(" + item.rid + ", " + item.hid + ", \"" + item.description + "\", " + item.price + ", NULL)", function (err, rows, field) {
                console.log("insert-room", err);
                res();
            });
        });
    };
    ConcreteMySQLRoomRepository.prototype.update = function (query, updateQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        _this.databasePool.query("update room set booker = \"" + updateQuery.booker + "\"", function (err, rows, field) {
                            console.log("update-room", err);
                            res();
                        });
                    })];
            });
        });
    };
    ConcreteMySQLRoomRepository.prototype.toRoom = function (row) {
        return new Room({
            hid: row.hid,
            rid: row.rid,
            description: row.description,
            price: row.price,
            booker: row.booker === null ? undefined : row.booker
        });
    };
    ConcreteMySQLRoomRepository.prototype.toRoomArray = function (rows) {
        var _this = this;
        return rows.map(function (row) {
            return _this.toRoom(row);
        });
    };
    return ConcreteMySQLRoomRepository;
}());
export { ConcreteMySQLRoomRepository };
