"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { model, Schema } = require("mongoose");
const constants_1 = __importDefault(require("../constants"));
const { USER_TYPES, DATABASES } = constants_1.default;
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: [USER_TYPES.USER, USER_TYPES.ADMIN],
    },
}, {
    timestamps: true,
});
const User = model(DATABASES.USER, UserSchema);
module.exports = User;
