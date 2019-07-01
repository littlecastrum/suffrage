"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
exports.index = function (req, res) {
    var languages = [
        { language: 'Spanish' },
        { language: "French" },
        { langauge: "German" },
        { language: "Arabic" }
    ];
    res.json(languages);
};
exports.users = function (req, res) {
    var users = [
        new user_1.default(1, 'jcoonce', 'james@none.com', 'test'),
        new user_1.default(2, 'jimcoonce', 'jim@none.com', 'test'),
        new user_1.default(3, 'jcoonce', 'norman@none.com', 'test'),
    ];
    res.json(users);
};
exports.user = function (req, res) {
    var id = req.params.id;
    var user = [
        new user_1.default(1, 'jcoonce', 'james@none.com', 'test'),
        new user_1.default(2, 'jimcoonce', 'jim@none.com', 'test'),
        new user_1.default(3, 'jcoonce', 'norman@none.com', 'test'),
    ][id];
    if (user) {
        res.json(user);
    }
    else {
        res.status(401).send("User with id " + id + " not found");
    }
};
exports.create = function (req, res) {
    var user = new user_1.default(req.body.id, req.body.username, req.body.email, req.body.password);
    res.json(user);
};
exports.login = function (req, res) {
    var users = [
        new user_1.default(1, 'jcoonce', 'james@none.com', 'test'),
        new user_1.default(2, 'jimcoonce', 'jim@none.com', 'test'),
        new user_1.default(3, 'jcoonce', 'norman@none.com', 'test'),
    ];
    var _a = req.body, username = _a.username, password = _a.password;
    if (username && password) {
        var user_2 = users.find(function (user) { return user.username === username && user.password === password; });
        if (user_2) {
            var payload = {
                sub: user_2.id,
                username: user_2.username
            };
            var token = jsonwebtoken_1.default.sign(payload, 'mysupersecretkey', { expiresIn: '3 hours' });
            res.status(200).send({ access_token: token });
        }
        else {
            res.status(401).send("User: " + username + ". Not found");
        }
    }
    else {
        res.status(400).send("Username & password are required");
    }
};
