import { Schema, model } from 'mongoose';

const pacientSchema = new Schema(
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
		birthDate: Date,
		idDocument: {
			docType: { type: String, trim: true },
			docNumber: { type: String, trim: true },
		},
		phoneNumber: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		address: {
			zipcode: { type: String },
			city: { type: String, trim: true },
			township: { type: String, trim: true },
			street: { type: String, trim: true },
			appartment: { type: String, trim: true },
		},
		referedById: {
			type: Schema.Types.ObjectId,
			ref: 'Pacient',
		},
		allergies: {
			type: String,
			trim: true,
		},
		records: {
			title: { type: String, trim: true },
			description: { type: String, trim: true },
		},
		status: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{
		timestamps: true,
	}
);

export default model('Pacient', pacientSchema);
