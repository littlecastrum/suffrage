"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    User.prototype.getUsername = function () {
        return this.username;
    };
    return User;
}());
exports.default = User;
