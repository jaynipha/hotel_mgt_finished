import { checkToken, verifyToken } from '../utils/toolbox'
import { Request,Response,NextFunction } from 'express';
import dotenv from "dotenv"
dotenv.config()

const secret  = process.env.SESSION_SECRET
export const authenticate = (req:any, res:Response, next:NextFunction) => {
    try {
        const token = checkToken(req);

        if (!token) return res.status(401).send({ status: false, message: 'Access denied, Token required' });
        const decodedToken = verifyToken(token,secret);
        console.log(decodedToken);

        req.user = decodedToken;
        next();
    } catch (error:any) {
        return res.status(404).send({ status: false, message: error.message });
    }
}

export const checkIfIsAdmin = (req:any, res:Response, next:NextFunction) => {
    const { role } = req.user;
    if(role !== 'admin'){
        return res.status(401).send({ status: false, message: 'Access denied, Admin Access Only !!!' });
    }
    next()
}