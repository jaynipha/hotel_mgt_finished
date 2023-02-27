'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as mongoose from 'mongoose';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initDatabase = (mongoose) => {
    console.log(process.env.MONGODB_URL);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to mongoDb'))
        .catch((err) => console.log(err.message));
};
exports.default = initDatabase;
