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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const constants_1 = __importDefault(require("../constants"));
const { MESSAGES } = constants_1.default;
const authService = require("../services/auth.service");
const joi = require("joi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user = [];
var refreshTokenStore = '';
class AuthController {
    //Once a user logs in, an expirable access token and an inexpirable refresh token is provided. This is for security reasons... The refresh token creates a new access token once the former one expires
    refreshAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.body.token;
            if (refreshToken == null) {
                return res.status(401).send({ message: "Missing refresh token body parameter" });
            }
            else {
                if (refreshTokenStore !== refreshToken) {
                    return res.status(403).send({ message: "Invalid token" });
                }
                else {
                    let envRefreshToken = process.env.REFRESH_TOKEN_SECRET;
                    //verify if refresh token is valid
                    jsonwebtoken_1.default.verify(refreshToken, envRefreshToken, (err, user) => {
                        if (err) {
                            return res.status(403).send(err);
                        }
                        else {
                            let envAccessToken = process.env.ACCESS_TOKEN_SECRET;
                            //create a new access token
                            const accessToken = jsonwebtoken_1.default.sign(user, envAccessToken, { expiresIn: '10m' });
                            res.json({ accessToken: accessToken });
                        }
                    });
                }
            }
        });
    }
    //Takes an email and password in the query body and checks the db if they match
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate user input with JOI
            const joiSchema = joi.object({
                email: joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                    .required(),
                password: joi.string()
                    .min(5)
                    .max(200)
                    .required(),
            });
            try {
                const value = yield joiSchema.validateAsync({ email: req.body.email, password: req.body.password });
                //pass the data to the login service module
                user = yield authService.login(req.body.email, req.body.password);
                console.log(user);
                if (user) {
                    //creates new access token and refresh token for the user
                    const accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                    const refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET);
                    refreshTokenStore = refreshToken;
                    res.status(200)
                        .json({ message: MESSAGES.LOGGED_IN, accessToken: accessToken, refreshToken: refreshToken });
                }
                else {
                    res.status(403)
                        .send({ message: MESSAGES.LOGIN_FAILURE });
                }
            }
            catch (err) {
                res.status(418).send({ message: "Invalid credentials" });
            }
        });
    }
    //Deletes the refresh token from the app
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refreshTokenStore != '') {
                refreshTokenStore = '';
                res.status(200).send({ message: MESSAGES.LOGOUT, success: true });
            }
            else {
                res.status(404).send({ message: MESSAGES.LOGIN_FIRST, success: true });
            }
        });
    }
}
module.exports = new AuthController();
