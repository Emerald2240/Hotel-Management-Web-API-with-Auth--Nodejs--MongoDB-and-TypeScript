"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = __importDefault(require("../constants"));
const { USER_TYPES, DATABASES } = constants_1.default;
const RoomTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});
const RoomType = (0, mongoose_1.model)(DATABASES.ROOM_TYPE, RoomTypeSchema);
module.exports = RoomType;
