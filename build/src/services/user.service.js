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
const Userr = require("../models/UserModel");
const bcryptEncrypter = require("bcrypt");
class UserService {
    //Create new user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Add salt to hashing to make it unique
            const salt = yield bcryptEncrypter.genSalt();
            const originalPassword = user.password;
            //Hash and encrypt user entered password
            const hashedPassword = yield bcryptEncrypter.hash(originalPassword, salt);
            user.password = hashedPassword;
            return yield Userr.create(user);
        });
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
            let emailRegexed = new RegExp(email, 'i');
            return yield Userr.findOne({ email: emailRegexed });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Userr.find();
        });
    }
    updateUserByEmail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //makes email case insensitive
            let emailRegexed = new RegExp(email, 'i');
            return yield Userr.findOneAndUpdate({ email: emailRegexed }, data, { new: true });
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Userr.findOneAndDelete({ email: email });
        });
    }
}
module.exports = new UserService();
