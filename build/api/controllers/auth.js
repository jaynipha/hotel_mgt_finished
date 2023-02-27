"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.deleteUser = exports.signIn = exports.signUp = void 0;
const user_1 = require("../models/user");
const toolbox_1 = require("../utils/toolbox");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SESSION_SECRET;
const signUp = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const checkExistingUser = await user_1.UserModel.findOne({ email });
        if (checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "User Exist!!",
            });
        }
        const data = {
            role,
            email,
            lastName,
            firstName,
            password: (0, toolbox_1.hashPassword)(password),
        };
        const newUser = await user_1.UserModel.create(data);
        await newUser.save();
        const token = (0, toolbox_1.createToken)({ role, email, id: newUser.id }, "1d", secret);
        return res.status(201).send({ status: true, data: newUser, token });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkExistingUser = await user_1.UserModel.findOne({ email });
        console.log(checkExistingUser);
        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            });
        }
        const checkPasswordValidity = (0, toolbox_1.comparePassword)(password, checkExistingUser.password);
        if (!checkPasswordValidity) {
            return res.status(400).json({
                status: false,
                message: "Invalid password",
            });
        }
        const token = (0, toolbox_1.createToken)({ role: checkExistingUser.role, email, id: checkExistingUser.id }, "1d", secret);
        return res.status(200).send({ status: true, data: checkExistingUser, token });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.signIn = signIn;
const deleteUser = async (req, res) => {
    const { email } = req.query;
    try {
        const checkExistingUser = await user_1.UserModel.findOne({ email });
        console.log(checkExistingUser);
        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            });
        }
        await user_1.UserModel.deleteOne({ email });
        return res.status(200).send({ status: true, message: `User with ${email} deleted !!` });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.deleteUser = deleteUser;
const getAllUser = async (req, res) => {
    try {
        const users = await user_1.UserModel.find();
        return res.status(200).send({ status: true, data: users });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.getAllUser = getAllUser;
