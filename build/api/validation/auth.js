"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = {
    firstName: joi_1.default.string().trim().required(),
    lastName: joi_1.default.string().trim().required(),
    email: joi_1.default.string().trim().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().required().trim(),
};
exports.signinSchema = {
    email: joi_1.default.string().trim().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().trim().min(4).max(30).required(),
};
