import mongoose from 'mongoose';
import  {Schema,model,Types} from 'mongoose';


interface Room {
	name: string;
	roomType: Types.ObjectId;
	price: number;
    }

const RoomSchema = new mongoose.Schema<Room>(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		roomType: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'roomType must be a valid ObjectId'],
		},
		price: {
			type: Number,
			required: [true, 'price is required'],
		},
	},
	{
		timestamps: true,
	}
);

export const RoomModel = mongoose.model<Room>('rooms', RoomSchema);
