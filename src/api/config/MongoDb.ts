'use strict';
import { Mongoose } from 'mongoose';
// import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initDatabase = (mongoose:any) => {
	console.log(process.env.MONGODB_URL)
	 mongoose
		.connect(process.env.MONGODB_URL, )
		.then(() => console.log('Connected to mongoDb'))
		.catch((err:any) => console.log(err.message));
};

export default initDatabase;
