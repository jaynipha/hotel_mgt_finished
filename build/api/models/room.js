"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    roomType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'roomType must be a valid ObjectId'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
}, {
    timestamps: true,
});
exports.RoomModel = mongoose_1.default.model('rooms', RoomSchema);
