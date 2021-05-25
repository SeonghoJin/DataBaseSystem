var SessionUser = /** @class */ (function () {
    function SessionUser(_a) {
        var name = _a.name, id = _a.id, isAuthenticated = _a.isAuthenticated;
        this.id = id;
        this.isAuthenticated = isAuthenticated;
        this.name = name;
    }
    return SessionUser;
}());
export { SessionUser };
