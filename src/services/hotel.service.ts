const Room = require("../models/RoomModel");
const RoomType = require("../models/RoomTypeModel");

class HotelService {
    async getAllRooms() {
        return await Room.find().populate('room_type');
    }

    async addRoom(room: any) {
        return await Room.create(room);
    }

    async getRoomById(id: string) {
        return await Room.findOne({ _id: id }).populate('room_type');
    }

    async findRoom(roomName: string, roomTypeId: string, minPrice: string, maxPrice: string) {

        //makes room name case insensitive
        let roomNameRegex = new RegExp(roomName, 'i');

        //Checks for matches in different columns
        return await Room.find().
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
    }

    async editRoomById(id: string, data: any) {
        return await Room.findByIdAndUpdate({ _id: id }, data, { new: true }).populate('room_type');
    }

    async deleteRoomById(id: any) {
        return await Room.findByIdAndDelete({ _id: id }).populate('room_type');
    }

    //Room Type Section
    async getAllRoomTypes() {
        // return await RoomType.find()
        //     .select('name description');

        return await RoomType.find();
    }

    async addRoomType(roomType: any) {
        return await RoomType.create(roomType);
    }

    async getRoomTypeById(id: string) {
        return await RoomType.findOne({ _id: id });
    }

    async editRoomTypeById(id: string, data: any) {
        return await RoomType.findByIdAndUpdate({ _id: id }, data, { new: true });
    }

    async deleteRoomTypeById(id: string) {
        return await RoomType.findOneAndDelete({ _id: id });
    }
}

module.exports = new HotelService();