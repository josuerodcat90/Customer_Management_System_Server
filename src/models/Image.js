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
		autopopulate: true,
	},
	appointment: {
		type: Schema.Types.ObjectId,
		ref: 'Appointment',
		required: true,
		autopopulate: true,
	},
	uploadedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		autopopulate: true,
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: String,
	updatedAt: String,
});

imageSchema.plugin(require('mongoose-autopopulate'));

export default model('Image', imageSchema);
