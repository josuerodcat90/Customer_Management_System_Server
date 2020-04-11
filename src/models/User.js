import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePic: {
		alt: { type: String },
		url: { type: String },
	},
	status: {
		type: Number,
		default: 1,
	},
	range: {
		type: Number,
		default: 2,
	},
	bachtitle: {
		type: String,
		default: 'User',
	},
	usericon: {
		type: String,
		default: 'user',
	},
	createdAt: String,
	updatedAt: String,
});

export default model('User', userSchema);
