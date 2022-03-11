"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user = require("../models/user");
const movielist = require("../models/user_movielist");
const bcrypt = require("bcrypt");
const moviecollection = require("../models/user_collections");
const saltRounds = 10;
const checkUser = (userEmail, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = yield user.findOne({ email: userEmail });
        const match = yield bcrypt.compare(userPassword, filter.password);
        if (match) {
            return filter.email;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.error("login credentials not found");
        return false;
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email && req.body.password) {
            const hashPassword = yield bcrypt.hash(req.body.password, saltRounds);
            const newUser = yield user.create({
                email: req.body.email,
                password: hashPassword,
            });
            const newMovielistUser = yield movielist.create({
                email: req.body.email,
            });
            const newMovieCollectionUser = yield moviecollection.create({
                email: req.body.email,
            });
            res.status(201);
            res.send({ newUser, newMovielistUser, newMovieCollectionUser });
        }
        else {
            console.error("parameter is missing");
            res.status(400);
            res.send("parameter is missing");
        }
    }
    catch (e) {
        if (e.code === 11000) {
            console.error("create new user is failing");
            res.status(500);
            res.send("try again - email already in use");
        }
        else {
            console.error("create new user is failing");
            res.status(500);
        }
    }
});
/*
    Bug: Session is undefined at the moment.

*/
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email && req.body.password) {
            const userEmail = req.body.email;
            const userPassword = req.body.password;
            const authenticate = yield checkUser(userEmail, userPassword);
            if (authenticate) {
                // req.session.userEmail = authenticate
                // console.log(req.session)
                res.status(200);
                res.send({ email: userEmail, password: userPassword });
            }
            else {
                console.error("login credentials not found");
                res.status(401);
                res.send("login credentials not found");
            }
        }
        else {
            console.error("parameter is missing");
            res.status(400);
            res.send("parameter is missing");
        }
    }
    catch (e) {
        console.error("login is failing");
        res.status(500);
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req.session.destroy()
        // res.clearCookie('sessionid');
        res.status(200);
        res.send("Logout successful");
    }
    catch (e) {
        console.error("logout is failing");
        res.status(500);
    }
});
module.exports = { createUser, loginUser, logoutUser };
