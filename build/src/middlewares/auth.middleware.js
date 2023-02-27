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
const authController = require("../controllers/auth.controller");
const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    req.body.user = 'User';
    next();
};
//Use json web token node module to validate access tokens and get encrypted user data
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const user = req.body.user;
    const token = authHeader && authHeader.split(' ')[1];
    let loggedOut = yield authController.confirmLoggedOut();
    if (!loggedOut) {
        if (token == null) {
            return res.status(401).send({ message: "Missing access token. Pass it in the headers: Auth section. In this format: 'Bearer sdfweuwe324wrw324sxs...'" });
        }
        else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(403).send({ message: "Please login first", err });
                req.body.user = user;
                next();
            });
        }
    }
    else {
        return res.status(403).send({ message: "Please Log in first", success: false });
    }
});
module.exports = authenticateToken;
