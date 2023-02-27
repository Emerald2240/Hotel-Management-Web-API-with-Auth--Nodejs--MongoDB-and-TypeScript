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
const hotelService = require('../services/hotel.service');
const constants_1 = __importDefault(require("../constants"));
const { MESSAGES } = constants_1.default;
//#endregion
class HotelhotelService {
    //#region GET  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //base api
    getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send({ message: MESSAGES.FETCHED, success: true });
        });
    }
    ;
    //fetch all rooms
    fetchAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield hotelService.getAllRooms();
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //fetch particular room with its id
    fetchRoomBasic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield hotelService.getRoomById(req.params.id);
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data: users });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //fetch particular room with its roomname or roomtypeid or minimum price or maximum price
    fetchRoomAdvanced(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let roomName = req.query.roomName;
            let roomTypeId = req.query.roomType;
            let minPrice = req.query.minPrice;
            let maxPrice = req.query.maxPrice;
            //Set the defaults incase they are not entered by the user
            if (roomName === undefined) {
                //Impossible to match value
                roomName = "######################";
            }
            if (roomTypeId === undefined) {
                //invalid and null roomType id
                roomTypeId = "63e77e9aadc3942c919e9160";
            }
            if (minPrice === undefined) {
                minPrice = '0';
            }
            if (maxPrice === undefined) {
                //Impossible to reach max value
                maxPrice = '999999999999999999999999999999999999999';
            }
            try {
                const users = yield hotelService.findRoom(roomName, roomTypeId, minPrice, maxPrice);
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data: users });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //Room Type Section/////////////////////////////////////////////////////////////////
    //fetch all room types
    fetchRoomTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypes = yield hotelService.getAllRoomTypes();
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //fetch particular room type with its id
    fetchRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomType = yield hotelService.getRoomTypeById(req.params.id);
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //#endregion
    //#region POST  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //create a room type
    createRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.addRoomType(req.body);
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
    ;
    //create a room
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.addRoom(req.body);
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
    ;
    //#endregion
    //#region PATCH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //edit a particular room
    editRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.editRoomById(req.params.roomId, req.body);
                res
                    .status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //edit a particular room type
    editRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.editRoomTypeById(req.params.roomTypeId, req.body);
                res
                    .status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //#endregion
    //#region DELETE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //find room and delete it
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.deleteRoomById(req.params.roomId);
                res
                    .status(200)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
    //find room type and delete
    deleteRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield hotelService.deleteRoomTypeById(req.params.roomTypeId);
                res
                    .status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            }
            catch (err) {
                res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
    ;
}
module.exports = new HotelhotelService();
