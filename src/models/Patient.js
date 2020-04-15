import { Schema, model } from 'mongoose';

const patientSchema = new Schema({
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
	birthDate: String,
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
		apartment: { type: String, trim: true },
	},
	referedBy: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
	},
	allergies: {
		type: String,
		trim: true,
	},
	records: [
		{
			title: { type: String, trim: true },
			description: { type: String, trim: true },
		},
	],
	status: {
		type: Number,
		required: true,
		default: 1,
	},
	createdAt: String,
	updatedAt: String,
});

export default model('Patient', patientSchema);
