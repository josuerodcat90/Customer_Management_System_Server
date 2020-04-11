import { Schema, model } from 'mongoose';

const pacientSchema = new Schema({
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
	idDocNumber: {
		docType: { type: String, trim: true },
		docNumber: { type: String, trim: true },
	},
	phonenumber: {
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
	referedById: String,
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
	createdAt: String,
	updatedAt: String,
});

export default model('Pacient', pacientSchema);
