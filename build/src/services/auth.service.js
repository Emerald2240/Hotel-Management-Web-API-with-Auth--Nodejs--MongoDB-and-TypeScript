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
const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const userController = require("../controllers/user.controller");
const constants = require("../constants");
const { MESSAGES } = constants;
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
class AuthService {
    //Compare user email and encrypted password
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailRegexed = new RegExp(email, 'i');
            const user = yield User.findOne({ email: emailRegexed });
            if (!user) {
                return null;
            }
            else {
                try {
                    if (yield bcrypt.compare(password, user.password)) {
                        return { first_name: user.first_name, last_name: user.last_name, email: user.email, user_type: user.user_type };
                    }
                }
                catch (_a) {
                    return null;
                }
            }
        });
    }
}
module.exports = new AuthService();
