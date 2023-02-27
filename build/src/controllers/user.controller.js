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
const userService = require('../services/user.service');
const constants_1 = __importDefault(require("../constants"));
const { MESSAGES } = constants_1.default;
const joi = require('joi');
class UserController {
    getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
        });
    }
    ;
    //Create a new user
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //verify user entries with JOI
            const joiSchema = joi.object({
                first_name: joi.string()
                    .min(3)
                    .max(200)
                    .required(),
                last_name: joi.string()
                    .min(3)
                    .max(200)
                    .required(),
                email: joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                    .required(),
                password: joi.string()
                    .min(5)
                    .max(200)
                    .required(),
                user_type: joi.string()
                    .min(4) //user
                    .max(5) //admin
                    .required()
            });
            try {
                const validBody = yield joiSchema.validateAsync(req.body);
                const data = yield userService.createUser(req.body);
                res
                    .status(201)
                    .send({ message: MESSAGES.CREATED, success: true, data });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    //get user from the database, using their email
    fetchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService.getUser(req.params.email);
                if (data) {
                    res
                        .status(200)
                        .send({ message: MESSAGES.FETCHED, success: true, data });
                }
                else {
                    res
                        .status(404)
                        .send({ message: MESSAGES.NOT_FOUND, success: false, data });
                }
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    //get all users in the user collection/table
    fetchAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService.getAllUsers();
                if (data) {
                    res
                        .status(200)
                        .send({ message: MESSAGES.FETCHED, success: true, data });
                }
                else {
                    res
                        .status(404)
                        .send({ message: MESSAGES.NOT_FOUND, success: false, data });
                }
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    //Update/edit user data
    updateUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService.updateUserByEmail(req.params.email, req.body);
                if (data) {
                    res
                        .status(201)
                        .send({ message: MESSAGES.UPDATED, success: true, data });
                }
                else {
                    res
                        .status(404)
                        .send({ message: MESSAGES.NOT_FOUND, success: false, data });
                }
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    //Delete user account entirely from the database
    deleteUserAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService.deleteUser(req.params.email);
                if (data) {
                    res
                        .status(201)
                        .send({ message: MESSAGES.DELETED, success: true, data });
                }
                else {
                    res
                        .status(404)
                        .send({ message: MESSAGES.NOT_FOUND, success: false, data });
                }
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
}
module.exports = new UserController();
