import mongoose from 'mongoose';

interface User {
	firstName: string;
	lastName: string;
	email: string;
	password:string;
	role: string;
    }

const UserSchema = new  mongoose.Schema<User>(
	{
		firstName: {
			type: String,
			required: [true, 'first name is required'],
		},
        lastName: {
			type: String,
			required: [true, 'last name is required'],
		},
		email: {
			type: String,
			required: [true, 'email is required'],
		},
		password: {
			type: String,
			required: [true, 'password is required'],
		},
        role: {
			type: String,
			required: [true, 'role is required'],
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model<User>('users', UserSchema);
