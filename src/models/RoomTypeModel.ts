import { model, Schema } from "mongoose";
import constants from "../constants";
import Room = require("./RoomModel");
const { USER_TYPES, DATABASES } = constants;

const RoomTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}
);

const RoomType = model(DATABASES.ROOM_TYPE, RoomTypeSchema);
module.exports = RoomType;