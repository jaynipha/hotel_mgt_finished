import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import { Request,Response } from 'express';


import routes from './api/routes/index';
import initDatabase from './api/config/MongoDb';

dotenv.config();
const app = express();

// mongoose.connect("mongodb+srv://jaiykneepharr:Donscorp1711*@cluster0.uzo1swk.mongodb.net/hotel").then(()=>{
// 	console.log("mongodb connected")
// })
initDatabase(mongoose);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/api/v1', routes);
app.get("/",(req:Request, res:Response)=>{
	res.send("all endpoints are active")

})

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

server.listen(process.env.PORT, () =>
	console.log(`listening on port: ${PORT}`)
);
