"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomTypeById = exports.deleteRoomTypeById = exports.deleteRoomById = exports.updateRoomById = exports.createRoom = exports.createRoomType = exports.getRoomType = exports.findRoomById = exports.getRoombySearchAndFilter = void 0;
const room_1 = require("../models/room");
const room_type_1 = require("../models/room-type");
/** GET HTTPS */
/**
 *  Get all rooms
 */
const getRoombySearchAndFilter = async (req, res) => {
    const { search, roomType, minPrice, maxPrice } = req.query;
    try {
        const searchQuery = search || '';
        const roomTypeQuery = roomType || '';
        const minPriceQuery = minPrice || 0;
        const maxPriceQuery = maxPrice || Number.MAX_SAFE_INTEGER;
        // Define the filter to be used in the query
        const filter = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                //  { roomType: roomTypeQuery },
                { price: { $gte: minPriceQuery, $lte: maxPriceQuery } }
            ]
        };
        const filteredRoomData = await room_1.RoomModel.find(filter);
        return res.status(200).send({ status: true, data: filteredRoomData });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.getRoombySearchAndFilter = getRoombySearchAndFilter;
/**
 *  Get singleroom by id
 */
const findRoomById = async (req, res) => {
    const id = req.params.id;
    room_1.RoomModel.findById(id, (err, rooms) => {
        if (err)
            return res.status(404).json({ message: err.message });
        return res.status(200).json({ rooms });
    });
};
exports.findRoomById = findRoomById;
/**
 *  Get room by type
 */
const getRoomType = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    if (page == "" || null || undefined || false || 0 || pageSize == "" || null || undefined || false || 0) {
        return res.status(400).json({
            status: false,
            message: "Invalid page number, should start with 1",
        });
    }
    const skipEqn = pageSize * (page - 1);
    try {
        const allRoomTypes = await room_type_1.RoomTypeModel.find().skip(skipEqn).limit(+pageSize);
        return res.status(200).send({ status: true, data: allRoomTypes });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.getRoomType = getRoomType;
//-----------------------------------------------------
/** POST HTTPS */
/**
 *  Creating room-type
 */
const createRoomType = async (req, res) => {
    const { name } = req.body;
    try {
        const newRoomType = new room_type_1.RoomTypeModel({ name });
        await newRoomType.save();
        return res.status(201).send({ status: true, data: newRoomType });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.createRoomType = createRoomType;
/**
 *  Creating room
 */
const createRoom = async (req, res) => {
    const { name, roomType, price } = req.body;
    try {
        const createRoom = new room_1.RoomModel({
            name, roomType, price
        });
        await createRoom.save();
        return res.status(201).send({ status: true, data: createRoom });
    }
    catch (err) {
        return res.status(404).json(err.message);
    }
};
exports.createRoom = createRoom;
//------------------------------------------------------
/** PUT HTTPS */
/**
 *  Updating room by type
 */
const updateRoomById = async (req, res) => {
    const data = req.body;
    const { roomId } = req.params;
    try {
        await room_1.RoomModel.findByIdAndUpdate(roomId, data);
        return res.status(200).send({ status: true, message: "Rooms Updated Succesfully" });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.updateRoomById = updateRoomById;
//------------------------------------------------------
/** DELETE HTTPS */
/**
 *  Delete RoomModel by id
 */
const deleteRoomById = async (req, res) => {
    const { roomId } = req.params;
    try {
        await room_1.RoomModel.findByIdAndDelete(roomId);
        return res.status(200).send({ status: true, message: `Room with ${roomId} successfully deleted !!` });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.deleteRoomById = deleteRoomById;
/**
 *  Delete RoomTypeModel by id
 */
const deleteRoomTypeById = async (req, res) => {
    const { roomTypeId } = req.params;
    try {
        const checkExistingRoomType = await room_type_1.RoomTypeModel.findOne({ _id: roomTypeId });
        if (!checkExistingRoomType) {
            return res.status(400).json({
                status: false,
                message: "Room Type not found",
            });
        }
        await room_type_1.RoomTypeModel.findByIdAndDelete(roomTypeId);
        return res.status(200).send({ status: true, message: `Room Type with ${roomTypeId} successfully deleted !!` });
    }
    catch (error) {
        return res.status(404).send({ status: false, message: error.message });
    }
};
exports.deleteRoomTypeById = deleteRoomTypeById;
const updateRoomTypeById = async (req, res) => {
    const data = req.body;
    const { roomTypeId } = req.params;
    try {
        const checkExistingRoomType = await room_type_1.RoomTypeModel.findOne({ _id: roomTypeId });
        if (checkExistingRoomType === null) {
            return res.status(400).json({
                status: false,
                message: "Room Type not found",
            });
        }
        await room_type_1.RoomTypeModel.findByIdAndUpdate(roomTypeId, data);
        return res.status(200).send({ status: true, message: "Room Type Updated Succesfully" });
    }
    catch (error) {
        return res.status(404).send({ status: false, message: error.message });
    }
};
exports.updateRoomTypeById = updateRoomTypeById;
