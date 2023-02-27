import { UserModel } from '../models/user';
import { hashPassword, createToken, comparePassword } from '../utils/toolbox'
import { Response,Request } from 'express';
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SESSION_SECRET

export const signUp = async (req:Request, res:Response) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const checkExistingUser= await UserModel.findOne({ email });
        if (checkExistingUser ) {
            return res.status(400).json({
                status: false,
                message: "User Exist!!",
            })
        }

        const data = {
            role,
            email,
            lastName,
            firstName,
            password: hashPassword(password),
        }

        const newUser = await UserModel.create(data);
        await newUser.save();

        const token = createToken({ role, email, id: newUser.id },"1d",secret)
        return res.status(201).send({ status: true, data: newUser, token })
    } catch (error:any) {
        return res.status(404).json(error.message);
    }
}


export const signIn = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    try {
       
        const checkExistingUser = await UserModel.findOne({ email });
        console.log(checkExistingUser)

        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        const checkPasswordValidity = comparePassword(password, checkExistingUser!.password);

        if (!checkPasswordValidity) {
            return res.status(400).json({
                status: false,
                message: "Invalid password",
            })
        }

        const token = createToken({ role: checkExistingUser!.role, email, id: checkExistingUser!.id },"1d",secret);
        return res.status(200).send({ status: true, data: checkExistingUser, token })

    } catch (error:any) {
        return res.status(404).json(error.message);
    }
}

export const deleteUser = async (req:Request, res:Response) => {
    const { email } = req.query;

    try {
        const checkExistingUser = await UserModel.findOne({ email });
        console.log(checkExistingUser)

        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        await UserModel.deleteOne({ email })
        return res.status(200).send({ status: true, message: `User with ${email} deleted !!` })
    } catch (error:any) {
        return res.status(404).json(error.message);
    }
}

export const getAllUser = async (req:Request, res:Response) => {
    try {

        const users = await UserModel.find()
        return res.status(200).send({ status: true, data: users })
    } catch (error:any) {
        return res.status(404).json(error.message);
    }
}

