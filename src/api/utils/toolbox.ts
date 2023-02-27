import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Request } from 'express';
dotenv.config();

export const hashPassword = (password:string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


export const  createToken = (payload:object, expiresIn :string,secret:any) => {
  return jwt.sign(payload, secret, { expiresIn });
}


export const comparePassword = (password:string, hash:string)  => {
  return bcrypt.compareSync(password, hash);
}

export const checkToken = (req:Request) => {
  const {
    headers: { authorization },
  } = req;
  

  let bearerToken = null;
  if (authorization === undefined) throw new Error('no auth');


  if (authorization) {
    bearerToken = authorization.split(' ')[1]
      ? authorization.split(' ')[1]
      : authorization;
  }

  return (
    bearerToken
    || req.headers['x-access-token']
    || req.headers.token
    || req.body.token
  );
}


export const verifyToken = (token:string,secret:any) => {
  // const secret:string |undefined = process.env.SESSION_SECRET
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new Error('Invalid Token');
  }
}
