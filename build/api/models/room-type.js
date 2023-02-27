"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTypeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoomTypeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
}, {
    timestamps: true,
});
exports.RoomTypeModel = mongoose_1.default.model('room-type', RoomTypeSchema);
