
import mongoose from 'mongoose';


interface room{
    name: string;
}

const RoomTypeSchema = new mongoose.Schema<room>(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
        },
    },
    {
        timestamps: true,
    }
);

export const RoomTypeModel = mongoose.model<room>('room-type', RoomTypeSchema);
