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
const Room = require("../models/RoomModel");
const RoomType = require("../models/RoomTypeModel");
class HotelService {
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Room.find().populate('room_type');
        });
    }
    addRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Room.create(room);
        });
    }
    getRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Room.findOne({ _id: id }).populate('room_type');
        });
    }
    findRoom(roomName, roomTypeId, minPrice, maxPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            //makes room name case insensitive
            let roomNameRegex = new RegExp(roomName, 'i');
            //Checks for matches in different columns
            return yield Room.find().
                and([
                {
                    $or: [
                        { name: roomNameRegex },
                        { room_type: roomTypeId },
                    ]
                },
                { 'price': { $gt: minPrice, $lt: maxPrice } }
            ]).
                limit(10).
                populate('room_type');
        });
    }
    editRoomById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Room.findByIdAndUpdate({ _id: id }, data, { new: true }).populate('room_type');
        });
    }
    deleteRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Room.findByIdAndDelete({ _id: id }).populate('room_type');
        });
    }
    //Room Type Section
    getAllRoomTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            // return await RoomType.find()
            //     .select('name description');
            return yield RoomType.find();
        });
    }
    addRoomType(roomType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RoomType.create(roomType);
        });
    }
    getRoomTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RoomType.findOne({ _id: id });
        });
    }
    editRoomTypeById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RoomType.findByIdAndUpdate({ _id: id }, data, { new: true });
        });
    }
    deleteRoomTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RoomType.findOneAndDelete({ _id: id });
        });
    }
}
module.exports = new HotelService();
