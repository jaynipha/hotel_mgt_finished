"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        required: [true, 'role is required'],
    },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
