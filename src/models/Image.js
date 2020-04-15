import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		required: true,
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
		required: true,
	},
	date: {
		type: Schema.Types.ObjectId,
		ref: 'Date',
		required: true,
	},
	uploadedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: String,
	updatedAt: String,
});

export default model('Image', imageSchema);
