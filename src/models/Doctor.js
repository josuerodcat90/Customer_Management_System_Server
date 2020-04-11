import { Schema, model } from 'mongoose';

const doctorSchema = new Schema(
	{
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
		status: {
			type: Number,
			default: 1,
		},
		bachTitle: {
			type: String,
			default: 'Dr',
		},
		userIcon: {
			type: String,
			default: 'fas fa-user-md',
		},
	},
	{
		timestamps: true,
	}
);

export default model('Doctor', doctorSchema);
